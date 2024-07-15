import { InlineBlot } from 'parchment';
import { UnionUnclearReason } from '../types';
import { TagName } from '../helper';

export class UnclearBlot extends InlineBlot {
  static blotName = 'unclear';
  static tagName = TagName.UNCLEAR;

  static create(reason: UnionUnclearReason) {
    const node = super.create();
    node.setAttribute('reason', reason);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('reason') || true;
  }
}
