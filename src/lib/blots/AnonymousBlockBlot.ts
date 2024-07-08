import { BlotConstructor, InlineBlot } from 'parchment';
import Break from 'quill/blots/break';
import Text from 'quill/blots/text';
import { AbbreviationBlot } from './AbbreviationBlot';
import { BlankSpaceBlot } from './BlankSpaceBlot';
import { DeletedBlot } from './DeletedBlot';
import { HighlightedBlot } from './HighlightedBlot';
import { UnclearBlot } from './UnclearBlot';

export class AnonymousBlockBlot extends InlineBlot {
  static blotName = 'anonymous-block';
  static tagName = 'AB';
  static allowedChildren: BlotConstructor[] = [
    HighlightedBlot,
    UnclearBlot,
    AbbreviationBlot,
    BlankSpaceBlot,
    DeletedBlot,
    Break,
    Text
  ];

  static create(n: string) {
    const node = super.create() as HTMLElement;
    node.setAttribute('n', n);
    return node;
  }

  /**
   * This method is used to define the formats that the blot will accept not that there is an issue with the InlineBlot
   * @see https://github.com/slab/quill/issues/1866
   */
  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('n') || '0';
  }
}
