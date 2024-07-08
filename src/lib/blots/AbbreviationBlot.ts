import Inline from 'quill/blots/inline';
import { UnionAbbreviationType } from '../types';

export class AbbreviationBlot extends Inline {
  static blotName = 'abbreviation';
  static tagName = 'ABBR';

  static create(rend: UnionAbbreviationType) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  /**
   * This method is used to define the formats that the blot will accept not that there is an issue with the InlineBlot
   * @see https://github.com/slab/quill/issues/1866
   */
  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
