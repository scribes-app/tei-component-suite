import formatXml, { XMLFormatterOptions } from 'xml-formatter';
import { EditorSettings } from '../components';
import { generateId, TagName, XMLAvailableTagsList } from '../lib/helper';

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

    // Cleanup
    (Array.from(root.querySelectorAll([TagName.STRUCTURE, TagName.ANONYMOUS_BLOCK].join(','))) as HTMLElement[])
      .forEach(el => el.removeAttribute('class'));

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
    return html.replace(/ class="[\w\s-]*"/g, '');
  }

  static TEI2Settings(html: string): EditorSettings {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = html
      .replace(/<\/?\??(xml|TEI|!DOCTYPE|text|body|cb|pb).*>/gm, '');
    return {
      manuscript: {
        folio: root.querySelector(TagName.FOLIO)?.getAttribute('n'),
        column: root.querySelector(TagName.COLUMN)?.getAttribute('n'),
        book: root.querySelector(`${TagName.STRUCTURE}[type="book"]`)?.getAttribute('n'),
      }
    };
  }

  static TEI2XML(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = html
      // Remove wrappers
      .replace(/<\/?\??(xml|TEI|!DOCTYPE|text|body|cb|pb).*>/gm, '')
      // Replace autoclosing tags
      .replace(/<([A-z]+)( [\w\"\=]*)?\/>/gm, '<$1 $2><\/$1>');

    if (root.firstElementChild.getAttribute('type') === 'book') {
      return root.firstElementChild.innerHTML;
    }

    return root.innerHTML;
  }

  static XML2TEI(html: string, settings: EditorSettings): string {
    const root = document.createElement(TagName.ROOT);
    const text = document.createElement('text');
    const body = document.createElement('body');
    text.setAttribute('xml:lang', 'g-l');

    let rootWrapper: HTMLElement = body;

    if (settings.manuscript?.folio) {
      const folio = document.createElement(TagName.FOLIO);
      folio.setAttribute('n', settings.manuscript.folio);
      body.appendChild(folio);
    }

    if (settings.manuscript?.column) {
      const column = document.createElement(TagName.COLUMN);
      column.setAttribute('n', settings.manuscript.column);
      body.appendChild(column);
    }

    if (settings.manuscript?.book) {
      const book = document.createElement(TagName.STRUCTURE);
      book.setAttribute('type', 'book');
      book.setAttribute('n', settings.manuscript.book);
      body.appendChild(book);
      rootWrapper = book;
    }

    rootWrapper.innerHTML = html;

    text.appendChild(body);
    root.appendChild(text);

    const formatConfig: XMLFormatterOptions = {
      indentation: '  ',
      collapseContent: true,
      lineSeparator: '\n',
    };

    return formatXml(`
      <?xml version="1.0" encoding="utf-8"?>
      <!DOCTYPE TEI>
      <TEI xmlns="http://www.tei-c.org/ns/1.0">
        ${formatXml(root.innerHTML, formatConfig)}
      </TEI>
    `, formatConfig);
  }

  static editor2XML(html: string): string {
    const root = document.createElement(TagName.ROOT);
    root.innerHTML = XMLTransformerService.transformEditor2XML(XMLTransformerService.preprocessLines(html));

    // Will replace <lb></lb> for autoclosing tags and perform multiple fixes if required
    const xml = new DOMParser().parseFromString(root.outerHTML, 'text/xml').documentElement.outerHTML;

    const content =
      formatXml(xml, {
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
    root.innerHTML = html
      // Replace autoclosing tags to HTML closing tags such as <lb /> to <lb></lb>
      .replace(/<([A-z]+)([ \w\"\=]*)?\/>/gm, '<$1 $2><\/$1>');

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

    // Unwrap the words from the XML
    for (const [ln, element] of map.entries()) {
      const unwrappedLine = XMLTransformerService.unwrapWordsFromXML(element);
      map.set(ln, unwrappedLine);
    }

    // Process custom tag behavior
    for (const [ln, element] of map.entries()) {
      const processedLine = XMLTransformerService.processCustomTagFromXML(element);
      map.set(ln, processedLine);
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
          const empty = node.nodeName === TagName.WORD && !node.textContent.trim().length;
          const cleanedNode = node.cloneNode(false) as HTMLElement;
          const cleanedChildren = XMLTransformerService.cleanNodesToXML(Array.from(node.childNodes))
          cleanedChildren.forEach(child => cleanedNode.appendChild(child));
          if (!empty) cleanedNodes.push(cleanedNode);
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
        const hasChild = Boolean(nodes.length) && nodes.some(n => ![TagName.UNKNOWN, TagName.PUNCTUATION, TagName.BLANK_SPACE].includes(n.nodeName as any));
        const breakElement = document.createElement(TagName.LINE_BREAK);
        breakElement.setAttribute('n', line.toString());

        // If it has no child, add the line break to the block
        if (!hasChild) {
          nodes.push(breakElement);
        }
        // Otherwise we have to check whether the last node is a structural node
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

          if (!lastStructuralNode) return;

          const mainStructuralNode = [...nodes].pop() as HTMLElement;

          // If the main structural node is the same as the last structural node, we append the break to the main node
          if (mainStructuralNode.isSameNode(lastStructuralNode)) {
            mainStructuralNode.appendChild(breakElement);
          }
          // If the last structural node is the last child of the main node, we append the break to the last node
          else if (mainStructuralNode.lastElementChild.isSameNode(lastStructuralNode)) {
            lastStructuralNode.appendChild(breakElement);
          }
          // Otherwise we append the break to the main node (for example if there is a <ab></ab> but the last node is a <w></w>)
          else {
            mainStructuralNode.appendChild(breakElement);
          }
        }

        nodes.forEach(node => element.appendChild(node));
        return element;
      }
      case TagName.PUNCTUATION: {
        const element = node.cloneNode(false) as HTMLElement;
        element.removeAttribute('contenteditable');
        element.textContent = node.textContent;
        return element;
      }

      case TagName.BLANK_SPACE: {
        const element = node.cloneNode(false) as HTMLElement;
        element.removeAttribute('contenteditable');
        return element;
      }

      case TagName.STRUCTURE:
      case TagName.ANONYMOUS_BLOCK:
      case TagName.UNCLEAR:
      case TagName.DELETED:
      case TagName.ABBREVIATION:
      case TagName.HIGHLIGHTED:
      case TagName.ANNOTATION:
      case TagName.RECONSTRUCTION: {
        const element = node.cloneNode(false) as HTMLElement;
        const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
        nodes.forEach(node => element.appendChild(node));
        return element;
      }

      case TagName.WORD: {
        const element = node.cloneNode(false) as HTMLElement;
        element.removeAttribute('x');
        const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
        nodes.forEach(node => element.appendChild(node));
        return element;
      }

      case TagName.TEXT: return node.cloneNode(false);

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

  static processCustomTagFromXML(line: HTMLElement): HTMLElement {
    const clonedLine = line.cloneNode(true) as HTMLElement;
    clonedLine.querySelectorAll(TagName.BLANK_SPACE).forEach(blankSpace => {
      blankSpace.textContent = '_';
      blankSpace.setAttribute('contenteditable', 'false');
    });

    clonedLine.querySelectorAll(TagName.PUNCTUATION).forEach(punctuation => {
      punctuation.setAttribute('contenteditable', 'false');
    });

    clonedLine.querySelectorAll(TagName.WORD).forEach(word => {
      word.setAttribute('x', generateId());
    });

    clonedLine.querySelectorAll(TagName.SPACE).forEach(space => {
      space.setAttribute('x', generateId());
    });

    return clonedLine;
  }

  static unwrapWordsFromXML(line: HTMLElement): HTMLElement {
    const clonedLine = line.cloneNode(true) as HTMLElement;
    const insertSpace = (element: Element) => {
      const space = document.createElement(TagName.SPACE);
      space.setAttribute('x', generateId());
      space.textContent = ' ';
      element.after(space);
    };

    // Insert space after blank space
    const blankSpaces = Array.from(clonedLine.querySelectorAll(TagName.BLANK_SPACE));
    blankSpaces.forEach(blankSpace => {
      const hasWordAfter = blankSpace.nextElementSibling?.nodeName === TagName.WORD;
      if (hasWordAfter) insertSpace(blankSpace);
    });

    // Insert space after punctuation
    const punctuations = Array.from(clonedLine.querySelectorAll(TagName.PUNCTUATION));
    punctuations.forEach(punctuation => {
      const hasWordAfter = punctuation.nextElementSibling?.nodeName === TagName.WORD;
      if (hasWordAfter) insertSpace(punctuation);
    });

    // Insert spaces
    const words = Array.from(clonedLine.querySelectorAll(TagName.WORD));
    words.forEach(word => {
      const isLastWord = Array.from(clonedLine.querySelectorAll(TagName.WORD)).pop().isSameNode(word) || word.nextElementSibling?.nodeName === TagName.PUNCTUATION;
      const isSpace = word.textContent === ' ';
      if (!isLastWord && !isSpace) insertSpace(word);
    });

    return clonedLine;
  }
}
