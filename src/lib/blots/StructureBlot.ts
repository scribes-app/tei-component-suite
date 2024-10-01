import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { TagName } from '../helper';
import { StructureAttributes } from '../types';
import { AnnotationBlot } from './AnnotationBlot';
import { AnonymousBlockBlot } from './AnonymousBlockBlot';
import { BlankSpaceBlot } from './BlankSpaceBlot';
import { PunctuationBlot } from './PunctuationBlot';
import { WordBlot } from './WordBlot';

export class StructureBlot extends InlineBlot {
  static blotName = 'structure';
  static tagName = TagName.STRUCTURE;
  static allowedChildren: BlotConstructor[] = [
    AnonymousBlockBlot,
    AnnotationBlot,
    BlankSpaceBlot,
    PunctuationBlot,
    WordBlot,
    Break,
    TextBlot
  ];

  static create(attr: StructureAttributes) {
    const node = super.create() as HTMLElement;
    node.setAttribute('type', attr.type);
    node.setAttribute('n', attr.n);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return {
      type: domNode.getAttribute('type') || 'chapter',
      n: domNode.getAttribute('n') || '0',
    };
  }
}
