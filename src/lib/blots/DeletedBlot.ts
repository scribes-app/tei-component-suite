import { InlineBlot } from 'parchment';
import { UnionDeletedRend } from '../types';

export class DeletedBlot extends InlineBlot {
  static blotName = 'deleted';
  static tagName = 'del';

  static create(rend: UnionDeletedRend) {
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
