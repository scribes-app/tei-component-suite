import { BlotConstructor, TextBlot } from 'parchment';
import Block from 'quill/blots/block';
import Break from 'quill/blots/break';
import { TagName, delayed } from '../helper';
import { StructureBlot } from './StructureBlot';

export class BlockBlot extends Block {
  static tagName = TagName.BLOCK;
  static allowedChildren: BlotConstructor[] = [
    StructureBlot,
    Break,
    TextBlot
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
