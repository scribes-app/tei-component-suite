import formatXml from 'xml-formatter';
import { TagName, XMLAvailableTagsList } from '../lib/helper';
import * as escaper from 'html-escaper';

/**
 * @description This class is responsible for performing any transformation on the from or to XML data
 */
export class XMLTransformerService {

  static escapeHTMLFromEditor(html: string): string {
    const xml = `<root>${XMLTransformerService.transformEditorToXML(html)}</root>`;
    const content = escaper
      .escape(
        formatXml(xml, {
          indentation: '  ',
          collapseContent: true,
          lineSeparator: '\n',
        })
        .replace(/<root>|<\/root>/g, '')
      )
      .split('\n');
    content.splice(0, 1);
    return content.join('\n');
  }

  static unescapeHTMLFromEditor(html: string): string {
    const xml = `<root>${html}</root>`;
    return formatXml.minify(escaper.unescape(xml), {
      collapseContent: true,
    })
    .replace(/<root>|<\/root>|<br>|<br\/>/g, '');
  }

  static transformXMLToEditor(xml: string): string {
    const tree = document.createElement('div');
    tree.innerHTML = xml;

    return tree.innerHTML;
  }
  static transformEditorToXML(rawHtml: string): string {
    const xml = document.createElement('div');
    const tree = document.createElement('div');
    tree.innerHTML = rawHtml;

    // Tranform the nodes to XML
    const transformedNodes = Array.from(tree.children)
      .map(l => XMLTransformerService.tranformNodeToXML(l, Number(l.getAttribute('n'))));

    // Merge the nodes to XML
    const mergedNodes = XMLTransformerService.mergeNodesToXML(transformedNodes.flatMap(node => Array.from(node.childNodes)));

    // Cleanup the XML
    const cleanedNodes = XMLTransformerService.cleanNodesToXML(mergedNodes);

    // Append the nodes to the XML
    cleanedNodes.forEach(node => xml.appendChild(node));
    return xml.innerHTML;
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
  static mergeNodesToXML(nodes: Node[]): Node[] {
    return Array.from(nodes)
      .reduce((acc, node) => {
        const mergedNode = node.cloneNode(false) as HTMLElement;
        const children = XMLTransformerService.mergeNodesToXML(Array.from(node.childNodes));
        children.forEach(child => mergedNode.appendChild(child));
        switch (mergedNode.nodeName) {
          case TagName.ANONYMOUS_BLOCK:
          case TagName.STRUCTURE: {
            const existingNode = acc.find((n: HTMLElement) => n.nodeName === TagName.STRUCTURE && (mergedNode as HTMLElement).getAttribute('n') === n.getAttribute('n'));
            if (existingNode) {
              const children = Array.from(mergedNode.childNodes);
              children.forEach(child => existingNode.appendChild(child));
            } else {
              acc.push(mergedNode);
            }
            break;
          }
          default: {
            acc.push(mergedNode);
          }
        };
        return acc;
      }, [] as Node[]);
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
        nodes.forEach(node => element.appendChild(node));
        return element;
      }
      case TagName.STRUCTURE: {
        /**
         * Check whether the node has an anonymous block as a child, if so, then we need to add the line break to it
         * otherwise, we need to add the line break to the node itself
         */
        if (node.lastChild.nodeName === TagName.ANONYMOUS_BLOCK) {
          const element = node.cloneNode(false) as HTMLElement;
          const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
          nodes.forEach(node => element.appendChild(node));
          return element;
        } else {
          const element = node.cloneNode(false) as HTMLElement;
          const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
          nodes.forEach(node => element.appendChild(node));
          const breakElement = document.createElement(TagName.LINE_BREAK);
          breakElement.setAttribute('n', line.toString());
          element.appendChild(breakElement);
          return element;
        }
      }
      case TagName.ANONYMOUS_BLOCK: {
        const element = node.cloneNode(false) as HTMLElement;
        const nodes = Array.from(node.childNodes).map(n => XMLTransformerService.tranformNodeToXML(n, line));
        nodes.forEach(node => element.appendChild(node));
        const breakElement = document.createElement(TagName.LINE_BREAK);
        breakElement.setAttribute('n', line.toString());
        element.appendChild(breakElement);
        return element;
      }
      case TagName.UNCLEAR:
      case TagName.DELETED:
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
      default: return document.createElement('UNKNOWN');
    }
  }

}
