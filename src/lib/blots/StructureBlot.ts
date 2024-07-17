import { BlotConstructor } from 'parchment';
import Break from 'quill/blots/break';
import { InlineBlot } from 'parchment';
import Text from 'quill/blots/text';
import { StructureAttributes } from '../types';
import { AbbreviationBlot } from './AbbreviationBlot';
import { AnonymousBlockBlot } from './AnonymousBlockBlot';
import { BlankSpaceBlot } from './BlankSpaceBlot';
import { DeletedBlot } from './DeletedBlot';
import { HighlightedBlot } from './HighlightedBlot';
import { UnclearBlot } from './UnclearBlot';
import { PunctuationBlot } from './PunctuationBlot';
import { TagName } from '../helper';
import { AnnotationBlot } from './AnnotationBlot';
import { ReconstructionBlot } from './ReconstructionBlot';

export class StructureBlot extends InlineBlot {
  static blotName = 'structure';
  static tagName = TagName.STRUCTURE;
  static allowedChildren: BlotConstructor[] = [
    AnonymousBlockBlot,
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
