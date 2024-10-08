import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { BlotName, TagName } from '../helper';
import { UnionHighlightedRend } from '../types';

export class HighlightedBlot extends InlineBlot {
  static blotName = BlotName.HIGHLIGHTED;
  static tagName = TagName.HIGHLIGHTED;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(rend: UnionHighlightedRend) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
