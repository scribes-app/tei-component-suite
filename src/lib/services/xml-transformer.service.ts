
/**
 * @description This class is responsible for performing any transformation on the from or to XML data
 */
export class XmlTransformerService {

  static sanitizeXMLFromEditor(xml: string): string {
    const tree = document.createElement('div');
    tree.innerHTML = xml;
    Array.from(tree.children)
      .forEach((node, i) => node.setAttribute('n', (++i).toString()));

    return tree.innerHTML;
  }

}
