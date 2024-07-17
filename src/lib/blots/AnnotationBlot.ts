import { InlineBlot } from 'parchment';
import { TagName } from '../helper';
import { AnnotationAttributes } from '../types';

export class AnnotationBlot extends InlineBlot {
  static blotName = 'annotation';
  static tagName = TagName.ANNOTATION;

  static create(attr: AnnotationAttributes) {
    const node = super.create();
    node.setAttribute('type', attr.type);
    node.setAttribute('rend', attr.rend);
    node.setAttribute('hand', attr.hand);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return {
      type: domNode.getAttribute('type') || 'top_margin',
      rend: domNode.getAttribute('rend') || 'oblique',
      hand: domNode.getAttribute('hand') || 'main_scribe',
    };
  }
}
