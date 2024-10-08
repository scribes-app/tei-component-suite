import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { BlotName, Punctuations, TagName } from '../helper';

export class PunctuationBlot extends InlineBlot {
  static blotName = BlotName.PUNCTUATION;
  static tagName = TagName.PUNCTUATION;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(punctuation: typeof Punctuations[number]) {
    const node = super.create();
    node.textContent = punctuation;
    node.setAttribute('contenteditable', 'false');
    return node;
  }

  static value(domNode: HTMLElement) {
    return domNode.textContent;
  }

  static formats(domNode: HTMLElement) {
    return domNode.textContent || true;
  }

}
