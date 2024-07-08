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

export class StructureBlot extends InlineBlot {
  static blotName = 'structure';
  static tagName = 'DIV';
  static allowedChildren: BlotConstructor[] = [
    AnonymousBlockBlot,
    HighlightedBlot,
    UnclearBlot,
    AbbreviationBlot,
    BlankSpaceBlot,
    DeletedBlot,
    Break,
    Text
  ];

  static create(attr: StructureAttributes) {
    const node = super.create() as HTMLElement;
    node.setAttribute('type', attr.type);
    node.setAttribute('n', attr.n);
    return node;
  }

  /**
   * This method is used to define the formats that the blot will accept not that there is an issue with the InlineBlot
   * @see https://github.com/slab/quill/issues/1866
   */
  static formats(domNode: HTMLElement) {
    return {
      type: domNode.getAttribute('type') || 'chapter',
      n: domNode.getAttribute('n') || '0',
    };
  }
}
