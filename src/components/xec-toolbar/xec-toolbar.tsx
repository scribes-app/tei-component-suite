import { Component, Host, h } from '@stencil/core';
import { JSX } from '@stencil/core/internal';

@Component({
  tag: 'xec-toolbar',
  styleUrl: 'xec-toolbar.scss',
  shadow: true,
})
export class XecToolbar {

  render(): JSX.Element {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
