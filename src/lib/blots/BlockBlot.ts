import Block from 'quill/blots/block';
import Text from 'quill/blots/text';
import Break from 'quill/blots/break';
import { TagName, delayed } from '../helper';
import { BlotConstructor } from 'parchment';
import { StructureBlot } from './StructureBlot';
import { PunctuationBlot } from './PunctuationBlot';
import { BlankSpaceBlot } from './BlankSpaceBlot';

export class BlockBlot extends Block {
  static tagName = TagName.BLOCK;
  static allowedChildren: BlotConstructor[] = [
    StructureBlot,
    BlankSpaceBlot,
    PunctuationBlot,
    Break,
    Text
  ];

  static create(value?: unknown): HTMLElement {
    const node = super.create(value);
    node.setAttribute('n', value as string);
    return node;
  }

  static formats() {
    return true;
  }

  build(): void {
    // Calculate the line position
    delayed(() => {
      const n = Array.from(this.domNode.parentElement?.children ?? []).indexOf(this.domNode) + 1;
      this.domNode.setAttribute('n', n.toString());
    }, 50);
    super.build();
  }
}
