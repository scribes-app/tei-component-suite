import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { BlotName, TagName } from '../helper';
import { UnionDeletedRend } from '../types';

export class DeletedBlot extends InlineBlot {
  static blotName = BlotName.DELETED;
  static tagName = TagName.DELETED;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(rend: UnionDeletedRend) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
