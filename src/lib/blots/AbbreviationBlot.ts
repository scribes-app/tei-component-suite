import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { TagName } from '../helper';
import { UnionAbbreviationType } from '../types';

export class AbbreviationBlot extends InlineBlot {
  static blotName = 'abbreviation';
  static tagName = TagName.ABBREVIATION;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(rend: UnionAbbreviationType) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
