import { BlotConstructor, InlineBlot, TextBlot } from 'parchment';
import { BlotName, TagName } from '../helper';
import { AnnotationAttributes } from '../types';
import Break from 'quill/blots/break';
import { WordBlot } from './WordBlot';

export class AnnotationBlot extends InlineBlot {
  static blotName = BlotName.ANNOTATION;
  static tagName = TagName.ANNOTATION;
  static allowedChildren: BlotConstructor[] = [
    WordBlot,
    Break,
    TextBlot
  ];

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
