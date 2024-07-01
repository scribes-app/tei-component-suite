import Inline from 'quill/blots/inline';
import { UnionHighlightedReason } from '../types';

export class HighlightedBlot extends Inline {
  static blotName = 'highlighted';
  static tagName = 'h';

  static create(rend: UnionHighlightedReason) {
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
