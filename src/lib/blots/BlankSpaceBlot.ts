import { InlineBlot } from 'parchment';
import { BlotName, TagName } from '../helper';
import { BlankSpaceAttributes } from '../types';

export class BlankSpaceBlot extends InlineBlot {
  static blotName = BlotName.BLANK_SPACE;
  static tagName = TagName.BLANK_SPACE;

  static create(attr: BlankSpaceAttributes) {
    const node = super.create();
    (node as HTMLElement).setAttribute('unit', attr.unit);
    (node as HTMLElement).setAttribute('value', attr.value.toString());
    node.textContent = '_';
    node.setAttribute('contenteditable', 'false');
    return node;
  }

  static value(domNode: HTMLElement) {
    return {
      unit: domNode.getAttribute('unit') || 'cm',
      value: parseInt(domNode.getAttribute('value') || '0'),
    };
  }

  static formats(domNode: HTMLElement) {
    return {
      unit: domNode.getAttribute('unit') || 'cm',
      value: parseInt(domNode.getAttribute('value') || '0'),
    };
  }
}
