import { InlineBlot } from 'parchment';
import { BlankSpaceAttributes } from '../types';
import { delayed } from '../helper';

export class BlankSpaceBlot extends InlineBlot {
  private optimizing: boolean = false;
  static blotName = 'blank-space';
  static tagName = 'SPACE';

  static create(attr: BlankSpaceAttributes) {
    const node = super.create();
    node.setAttribute('unit', attr.unit);
    node.setAttribute('value', attr.value.toString());
    // This is required to avoid autoremove from quill
    node.textContent = '_';
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

  optimize(): void {
    console.log('run');
    // Prevent typing inside the blank space
    if (!this.optimizing) {
      // Will recall the optimize method, we prevent the infinite loop by setting the optimizing flag
      this.optimizing = true;
      this.domNode.textContent = '_';
      delayed(() => { this.optimizing = false; }, 50)
    }
  }
}
