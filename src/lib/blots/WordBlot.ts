import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { TagName, generateId } from '../helper';
import { AbbreviationBlot } from './AbbreviationBlot';
import { DeletedBlot } from './DeletedBlot';
import { HighlightedBlot } from './HighlightedBlot';
import { ReconstructionBlot } from './ReconstructionBlot';
import { UnclearBlot } from './UnclearBlot';

export class WordBlot extends InlineBlot {
  static blotName = 'word';
  static tagName = TagName.WORD;
  static allowedChildren: BlotConstructor[] = [
    UnclearBlot,
    HighlightedBlot,
    DeletedBlot,
    AbbreviationBlot,
    ReconstructionBlot,
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
