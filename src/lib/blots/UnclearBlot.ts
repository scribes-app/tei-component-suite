import { InlineBlot } from 'parchment';
import { UnionUnclearReason } from '../types';

export class UnclearBlot extends InlineBlot {
  static blotName = 'unclear';
  static tagName = 'unclear';

  static create(reason: UnionUnclearReason) {
    const node = super.create();
    node.setAttribute('reason', reason);
    return node;
  }

  /**
   * This method is used to define the formats that the blot will accept not that there is an issue with the InlineBlot
   * @see https://github.com/slab/quill/issues/1866
   */
  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('reason') || true;
  }
}
