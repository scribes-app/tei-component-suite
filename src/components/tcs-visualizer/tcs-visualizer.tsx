import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tcs-visualizer',
  styleUrl: 'tcs-visualizer.scss',
  shadow: true,
})
export class TcsVisualizer {
  render() {
    return (
      <Host>
        it works
      </Host>
    );
  }
}
