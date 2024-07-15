import { EmbedBlot } from 'parchment';
import { TagName } from '../helper';
import { BlankSpaceAttributes } from '../types';

export class BlankSpaceBlot extends EmbedBlot {
  static blotName = 'blank-space';
  static tagName = TagName.BLANK_SPACE;

  static create(attr: BlankSpaceAttributes) {
    const node = super.create();
    (node as HTMLElement).setAttribute('unit', attr.unit);
    (node as HTMLElement).setAttribute('value', attr.value.toString());
    const inner = document.createElement('span');
    inner.textContent = '_';
    inner.setAttribute('contenteditable', 'false');
    node.appendChild(inner);
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
