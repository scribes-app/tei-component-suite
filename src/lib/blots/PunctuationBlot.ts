import { EmbedBlot } from 'parchment';
import { Punctuations, TagName } from '../helper';

export class PunctuationBlot extends EmbedBlot {
  static blotName = 'punctuation';
  static tagName = TagName.PUNCTUATION;

  static create(punctuation: typeof Punctuations[number]) {
    const node = super.create();
    const inner = document.createElement('span');
    inner.textContent = punctuation;
    inner.setAttribute('contenteditable', 'false');
    node.appendChild(inner);
    return node;
  }

  static value(domNode: HTMLElement) {
    return domNode.textContent;
  }

  static formats(domNode: HTMLElement) {
    return domNode.textContent || true;
  }

}
