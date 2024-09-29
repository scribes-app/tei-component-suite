import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { TagName } from '../helper';
import { UnionUnclearReason } from '../types';

export class UnclearBlot extends InlineBlot {
  static blotName = 'unclear';
  static tagName = TagName.UNCLEAR;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(reason: UnionUnclearReason) {
    const node = super.create();
    node.setAttribute('reason', reason);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('reason') || true;
  }
}
