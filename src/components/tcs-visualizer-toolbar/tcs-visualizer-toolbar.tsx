import { Component, Host, Prop, h } from '@stencil/core';
import { UnionEditorLayoutType, VisualizerToolbarConfig } from '../../components';
import { UnionVisualizerLayoutType } from '../../lib/types';

@Component({
  tag: 'tcs-visualizer-toolbar',
  styleUrl: 'tcs-visualizer-toolbar.scss',
  shadow: true,
})
export class TcsVisualizerToolbar {

  @Prop()
  public readonly config: VisualizerToolbarConfig;

  @Prop()
  public readonly layoutType: UnionVisualizerLayoutType = 'rows';

  render() {
    return (
      <Host>
        <div class="controls">

          <div class="alignRight">

          </div>
        </div>
      </Host>
    );
  }
}
