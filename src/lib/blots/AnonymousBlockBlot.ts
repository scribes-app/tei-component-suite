import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { TagName } from '../helper';
import { AbbreviationBlot } from './AbbreviationBlot';
import { AnnotationBlot } from './AnnotationBlot';
import { BlankSpaceBlot } from './BlankSpaceBlot';
import { PunctuationBlot } from './PunctuationBlot';
import { ReconstructionBlot } from './ReconstructionBlot';
import { WordBlot } from './WordBlot';

export class AnonymousBlockBlot extends InlineBlot {
  static blotName = 'anonymous-block';
  static tagName = TagName.ANONYMOUS_BLOCK;
  static allowedChildren: BlotConstructor[] = [
    AbbreviationBlot,
    BlankSpaceBlot,
    PunctuationBlot,
    AnnotationBlot,
    ReconstructionBlot,
    WordBlot,
    Break,
    TextBlot
  ];

  static create(n: string) {
    const node = super.create() as HTMLElement;
    node.setAttribute('n', n);
    return node;
  }

  static formats(domNode: HTMLElement, scroll: any) {
    super.formats(domNode, scroll);
    return domNode.getAttribute('n') || '0';
  }
}
