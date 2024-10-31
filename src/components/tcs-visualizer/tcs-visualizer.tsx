import { Component, Host, Prop, State, h } from '@stencil/core';
import classNames from 'classnames';
import { UnionCommentType, UnionVisualizerLayoutType, VisualizerToolbarConfig } from '../../lib/types';

@Component({
  tag: 'tcs-visualizer',
  styleUrl: 'tcs-visualizer.scss',
  shadow: true,
})
export class TcsVisualizer {

  @Prop({ mutable: true })
  public toolbarConfig: VisualizerToolbarConfig = defaultVisualizerToolbarConfig;

  @State()
  private activeCommentTab: UnionCommentType = 'line';

  @State()
  private layoutType: UnionVisualizerLayoutType = 'rows';

  render() {
    const {
      layoutType,
      toolbarConfig
    } = this;
    return (
      <Host class={classNames({
        [layoutType]: true,
      })}>
        <div class="documentViewer">

        </div>
        <div class="dataViewer">
          <tcs-visualizer-toolbar
            class="toolbar"
            config={toolbarConfig}
            layoutType={layoutType}
          />
          <div class="viewers">
            <div class={classNames({
              viewer: true,
              transcribe: true,
            })} />
            <div class={classNames({
              viewer: true,
              translate: true,
            })} />
            <div class={classNames({
              viewer: true,
              comment: true,
            })} />
          </div>
        </div>
      </Host>
    );
  }
}

const defaultVisualizerToolbarConfig: VisualizerToolbarConfig = {
  controls: {
    layout: true,
  },
};
