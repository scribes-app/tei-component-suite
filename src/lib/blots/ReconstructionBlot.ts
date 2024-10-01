import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import { TagName } from '../helper';
import { UnionReconstructionReason } from '../types';
import Break from 'quill/blots/break';

export class ReconstructionBlot extends InlineBlot {
  static blotName = 'reconstruction';
  static tagName = TagName.RECONSTRUCTION;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(reason: UnionReconstructionReason) {
    const node = super.create();
    node.setAttribute('reason', reason);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('reason') || true;
  }
}
