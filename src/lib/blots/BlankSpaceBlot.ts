import Inline from 'quill/blots/inline';
import { BlankSpaceAttributes } from '../types';

export class BlankSpaceBlot extends Inline {
  static blotName = 'blankspace';
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
      unit: domNode.getAttribute('unit'),
      value: parseInt(domNode.getAttribute('value') || '0'),
    };
  }
}
