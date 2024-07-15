import Inline from 'quill/blots/inline';
import { UnionAbbreviationType } from '../types';
import { TagName } from '../helper';

export class AbbreviationBlot extends Inline {
  static blotName = 'abbreviation';
  static tagName = TagName.ABBREVIATION;

  static create(rend: UnionAbbreviationType) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
