import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import Break from 'quill/blots/break';
import { BlotName, TagName, generateId } from '../helper';

export class SpaceBlot extends InlineBlot {
  static blotName = BlotName.SPACE;
  static tagName = TagName.SPACE;
  static allowedChildren: BlotConstructor[] = [
    Break,
    TextBlot
  ];

  static create(param?: string|boolean) {
    const id = typeof param === 'string' && param.length > 0 ? param : generateId();
    const node = super.create();
    node.setAttribute('x', id);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('x') || true;
  }
}
