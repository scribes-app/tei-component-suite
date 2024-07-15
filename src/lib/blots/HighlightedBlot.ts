import { InlineBlot } from 'parchment';
import { UnionHighlightedRend } from '../types';
import { TagName } from '../helper';

export class HighlightedBlot extends InlineBlot {
  static blotName = 'highlighted';
  static tagName = TagName.HIGHLIGHTED;

  static create(rend: UnionHighlightedRend) {
    const node = super.create();
    node.setAttribute('rend', rend);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('rend') || true;
  }
}
