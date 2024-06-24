import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xec-editor',
  styleUrl: 'xec-editor.scss',
  shadow: true,
})
export class XecEditor {

  render() {
    return (
      <Host>
        <span>it works</span>
        <slot></slot>
      </Host>
    );
  }

}
