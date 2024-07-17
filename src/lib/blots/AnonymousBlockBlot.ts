import { BlotConstructor, InlineBlot } from 'parchment';
import Break from 'quill/blots/break';
import Text from 'quill/blots/text';
import { AbbreviationBlot } from './AbbreviationBlot';
import { BlankSpaceBlot } from './BlankSpaceBlot';
import { DeletedBlot } from './DeletedBlot';
import { HighlightedBlot } from './HighlightedBlot';
import { UnclearBlot } from './UnclearBlot';
import { PunctuationBlot } from './PunctuationBlot';
import { TagName } from '../helper';
import { AnnotationBlot } from './AnnotationBlot';
import { ReconstructionBlot } from './ReconstructionBlot';

export class AnonymousBlockBlot extends InlineBlot {
  static blotName = 'anonymous-block';
  static tagName = TagName.ANONYMOUS_BLOCK;
  static allowedChildren: BlotConstructor[] = [
    HighlightedBlot,
    UnclearBlot,
    AbbreviationBlot,
    BlankSpaceBlot,
    DeletedBlot,
    PunctuationBlot,
    AnnotationBlot,
    ReconstructionBlot,
    Break,
    Text
  ];

  static create(n: string) {
    const node = super.create() as HTMLElement;
    node.setAttribute('n', n);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('n') || '0';
  }
}
