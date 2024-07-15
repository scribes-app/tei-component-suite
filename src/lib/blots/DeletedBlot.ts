import { InlineBlot } from 'parchment';
import { UnionDeletedRend } from '../types';
import { TagName } from '../helper';

export class DeletedBlot extends InlineBlot {
  static blotName = 'deleted';
  static tagName = TagName.DELETED;
  static create(rend: UnionDeletedRend) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
