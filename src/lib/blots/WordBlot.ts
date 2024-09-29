import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { TagName, generateId } from '../helper';
import { UnclearBlot } from './UnclearBlot';
import { HighlightedBlot } from './HighlightedBlot';
import { DeletedBlot } from './DeletedBlot';

export class WordBlot extends InlineBlot {
  static blotName = 'word';
  static tagName = TagName.WORD;
  static allowedChildren: BlotConstructor[] = [
    UnclearBlot,
    HighlightedBlot,
    DeletedBlot,
    Break,
    TextBlot
  ];

  static create() {
    const node = super.create();
    node.setAttribute('x', generateId());
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('x') || true;
  }
}
