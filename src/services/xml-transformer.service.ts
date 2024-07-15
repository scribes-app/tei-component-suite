import formatXml from 'xml-formatter';
import { TagName, XMLAvailableTagsList } from '../lib/helper';

/**
 * @description This class is responsible for performing any transformation on the from or to XML data
 */
export class XMLTransformerService {

  static preprocessLines(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = html;
    Array.from(root.children)
      .forEach((line, n) => {
        line.setAttribute('n', (++n).toString());
      });
    return root.innerHTML;
  }

  static addClasses(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = html;
    // Adds first class to the first structure or anonymous block with the same name
    (Array.from(root.querySelectorAll([TagName.STRUCTURE, TagName.ANONYMOUS_BLOCK].join(','))) as HTMLElement[])
      .reduce<HTMLElement[]>((acc, element) => {
        const exists = acc.some(el => el.nodeName === element.nodeName && el.getAttribute('n') === element.getAttribute('n'));
        if (!exists) acc.push(element);
        return acc;
      }, [])
      .forEach(el => el.classList.add('first'));

    // Adds last class to the last structure or anonymous block with the same name
    (Array.from(root.querySelectorAll([TagName.STRUCTURE, TagName.ANONYMOUS_BLOCK].join(','))) as HTMLElement[])
      .reduce<HTMLElement[]>((acc, element) => {
        const index = acc.findIndex(el => el.nodeName === element.nodeName && el.getAttribute('n') === element.getAttribute('n'));
        if (index !== -1) {
          acc.splice(index, 1, element);
        } else {
          acc.push(element);
        }
        return acc;
      }, [])
      .forEach(el => el.classList.add('last'));

    return root.innerHTML;
  }

  static removeClasses(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = html;
    (Array.from(root.querySelectorAll([TagName.STRUCTURE, TagName.ANONYMOUS_BLOCK].join(','))) as HTMLElement[])
      .forEach(el => el.removeAttribute('class'));
    return root.innerHTML;
  }

  static editor2XML(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = XMLTransformerService.transformEditor2XML(XMLTransformerService.preprocessLines(html));
    const content =
      formatXml(root.outerHTML, {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n',
      })
      .replace(/<root>|<\/root>/g, '')
      .replace(/^  /gm, '')
      .split('\n');
    content.splice(0, 1);
    return content.join('\n');
  }

  static XML2Editor(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = html;
    const parsed = formatXml.minify(root.outerHTML, {
      collapseContent: true,
    })
    .replace(/<(\/)?root>|<br( )?(\/)?>/g, '');
    return XMLTransformerService.transformXML2Editor(parsed);
  }

  static transformXML2Editor(xml: string): string {
    const tree = new DOMParser()
      .parseFromString(`<root>${xml}</root>`, 'text/html')
      .querySelector('root') as HTMLElement;

    // Create lines according to lb tags
    const map: Map<number, HTMLElement> = XMLTransformerService.createLinesFromXML(tree);

    // Extract the lines from the XML
    for (const [ln, element] of map.entries()) {
      element.append(...XMLTransformerService.extractLineContentFromXML(ln, tree));
    }


    for (const [ln, element] of map.entries()) {
      const unwrappedLine = XMLTransformerService.unwrapWordsFromXML(element);
      map.set(ln, unwrappedLine);
    }

    const root = document.createElement(TagName.ROOT);
    Array.from(map.values()).forEach((line, n) => {
      line.setAttribute('n', n.toString());
      root.appendChild(line);
    });

    return root.innerHTML;
  }

  static transformEditor2XML(rawHtml: string): string {
    const root = document.createElement(TagName.ROOT);
    const tree = document.createElement(TagName.ROOT);
    tree.innerHTML = rawHtml;

    // Tranform the nodes to XML
    const transformedNodes = Array.from(tree.children)
      .map(l => XMLTransformerService.tranformNodeToXML(l, Number(l.getAttribute('n'))));

    // Merge the nodes to XML
    const mergedNodes = XMLTransformerService.mergeExtractToXML(transformedNodes);

    // Cleanup the XML
    const cleanedNodes = XMLTransformerService.cleanNodesToXML(mergedNodes);

    // Append the nodes to the XML
    cleanedNodes.forEach(node => root.appendChild(node));
    return root.innerHTML;
  }

  /**
   * Unwrap words from the XML and removes undesired tags
   */
  static cleanNodesToXML(nodes: Node[]): Node[] {
    const cleanedNodes: Node[] = [];
    Array.from(nodes)
      .forEach(node => {
        if (XMLAvailableTagsList.includes(node.nodeName)) {
          const cleanedNode = node.cloneNode(false) as HTMLElement;
          const cleanedChildren = XMLTransformerService.cleanNodesToXML(Array.from(node.childNodes))
          cleanedChildren.forEach(child => cleanedNode.appendChild(child));
          cleanedNodes.push(cleanedNode);
        } else {
          if (node.nodeName === TagName.WORD_WRAP) {
            const words = Array.from(node.childNodes);
            words.forEach(word => cleanedNodes.push(word));
          }
        }
      });

    return cleanedNodes;
  }

  /**
   * Merge blocks (Anonymous and structural blocks) to the XML
   */
  static mergeExtractToXML(nodes: Node[]): Node[] {
    // Remove the line wrapper
    const clonedNodes = nodes
      .flatMap(n => Array.from(n.childNodes))
      .map(n => n.cloneNode(true));

    // Create a flat mat of every structural nodes
    const structuralNodes = clonedNodes
      .reduce((acc, node) => {
        acc.push(node as HTMLElement);
        acc.push(...Array.from((node as HTMLElement).querySelectorAll('*')) as HTMLElement[]);
        return acc;
      }, [] as HTMLElement[])
      .filter(node => node.nodeName === TagName.STRUCTURE || node.nodeName === TagName.ANONYMOUS_BLOCK)

    for (const node of structuralNodes) {
      const similarNodes = structuralNodes.filter(n => n.nodeName === node.nodeName && n.getAttribute('n') === node.getAttribute('n') && !n.isSameNode(node));
      similarNodes.forEach(n => {
        Array.from(n.childNodes).forEach(child => node.appendChild(child));
        n.remove();
        structuralNodes.splice(structuralNodes.indexOf(n), 1);
      });
    }

    const mergedNodes: Node[] = [];

    clonedNodes.forEach(node => {
      if (node.hasChildNodes() || node.nodeName === TagName.LINE_BREAK) mergedNodes.push(node);
    });

    return mergedNodes;
  }

  /**
   * Transform the node to XML
   * - Add line break to the node
   * - Add word wrap to text nodes
   * - Remove text nodes
   */
  static tranformNodeToXML(node: Node, line: number): Node {
    switch (node.nodeName) {
      case TagName.BLOCK: {
        const element = node.cloneNode(false) as HTMLElement;
        const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
        const hasChild = Boolean(nodes.length) && nodes.some(n => n.nodeName !== TagName.UNKNOWN && n.nodeName !== TagName.WORD_WRAP);
        const breakElement = document.createElement(TagName.LINE_BREAK);
        breakElement.setAttribute('n', line.toString());

        // Add line break to the last structure child of the block or if it has no child
        if (!hasChild) {
          nodes.push(breakElement);
        }
        // Otherwise add the line break to the last structure child of the block
        else {
          const lastStructuralNode = [...nodes]
            .flatMap(n => [
              ...(n.nodeName === TagName.STRUCTURE ? [n as HTMLElement] : []),
              ...(Array.from((n as HTMLElement).querySelectorAll([
                  TagName.STRUCTURE,
                  TagName.ANONYMOUS_BLOCK
              ].join(', '))))
            ])
            .pop();
          lastStructuralNode?.appendChild(breakElement);
        }

        nodes.forEach(node => element.appendChild(node));
        return element;
      }

      case TagName.STRUCTURE:
      case TagName.ANONYMOUS_BLOCK:
      case TagName.UNCLEAR:
      case TagName.DELETED:
      case TagName.ABBREVIATION:
      case TagName.HIGHLIGHTED:
      case TagName.BLANK_SPACE: {
        const element = node.cloneNode(false) as HTMLElement;
        const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
        nodes.forEach(node => element.appendChild(node));
        return element;
      }

      case TagName.TEXT: {
        const parent = node.parentElement;
        const element = document.createElement(TagName.WORD_WRAP);
        node.textContent
          .split(' ')
          .filter(text => text.length > 0)
          .map(text => {
            const w = document.createElement(TagName.WORD);
            w.textContent = text;
            return w;
          })
          .forEach(child => element.appendChild(child));
        parent.removeChild(node);
        return element;
      }
      // Keep the function working even if the node is not recognized but signal that there is an issue
      default: return document.createElement(TagName.UNKNOWN);
    }
  }

  static createLinesFromXML(tree: HTMLElement): Map<number, HTMLElement> {
    const map = new Map<number, HTMLElement>();

    // Extract line breaks to create the lines
    const lbs = Array.from(tree.querySelectorAll(TagName.LINE_BREAK));
    lbs.forEach(lb => {
      const n = Number(lb.getAttribute('n'));
      map.set(n, document.createElement(TagName.BLOCK));
    });

    return map;
  }

  static extractLineContentFromXML(ln: number, tree: HTMLElement): Node[] {
    const lb = tree.querySelector(`${TagName.LINE_BREAK}[n="${ln}"]`);
    let elements: Node[] = [];
    let element = lb.previousElementSibling;
    let parent = element?.parentElement;

    // There is no parent in some case as a simple line break but we need to keep it as a line
    if (!parent) return [];

    while (element) {
      const clonedElement = element.cloneNode(true);
      elements.unshift(clonedElement);
      const removableElement = element;
      element = element.previousElementSibling;
      removableElement.remove();
    }

    while (parent && parent.nodeName !== TagName.ROOT) {
      const isEmpty = !parent.textContent.trim().length;
      const clonedParent = parent.cloneNode(false) as HTMLElement;
      clonedParent.append(...elements);
      elements = [clonedParent];
      let previousParent = parent.previousSibling;
      while (previousParent) {
        const clonedPreviousParent = previousParent.cloneNode(true);
        elements.unshift(clonedPreviousParent);
        const removableElement = previousParent;
        previousParent = previousParent.previousSibling;
        removableElement.remove();
      }
      const removableElement = parent;
      parent = parent.parentElement;
      if (isEmpty) removableElement.remove();
    }

    return elements;
  }

  static unwrapWordsFromXML(line: HTMLElement): HTMLElement {
    const clonedLine = line.cloneNode(true) as HTMLElement;
    const words = Array.from(clonedLine.querySelectorAll(TagName.WORD));
    words.forEach(word => {
      const isLastWord = Array.from(clonedLine.querySelectorAll(TagName.WORD)).pop().isSameNode(word);
      word.replaceWith(document.createTextNode(word.textContent + (isLastWord ? '' : ' ')));
    });
    return clonedLine;
  }
}
