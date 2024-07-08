import { InlineBlot } from 'parchment';
import { BlankSpaceAttributes } from '../types';

export class BlankSpaceBlot extends InlineBlot {
  static blotName = 'blank-space';
  static tagName = 'space';

  static create(attr: BlankSpaceAttributes) {
    const node = super.create();
    node.setAttribute('unit', attr.unit);
    node.setAttribute('value', attr.value.toString());
    return node;
  }

  /**
   * This method is used to define the formats that the blot will accept not that there is an issue with the InlineBlot
   * @see https://github.com/slab/quill/issues/1866
   */
  static formats(domNode: HTMLElement) {
    return {
      unit: domNode.getAttribute('unit') || 'cm',
      value: parseInt(domNode.getAttribute('value') || '0'),
    };
  }
}
