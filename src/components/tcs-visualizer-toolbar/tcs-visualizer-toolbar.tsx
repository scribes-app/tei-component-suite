import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { VisualizerToolbarConfig } from '../../components';
import { UnionVisualizerLayoutType } from '../../lib/types';

@Component({
  tag: 'tcs-visualizer-toolbar',
  styleUrl: 'tcs-visualizer-toolbar.scss',
  shadow: true,
})
export class TcsVisualizerToolbar {

  @Event()
  private readonly clickLayout: EventEmitter<UnionVisualizerLayoutType>;

  @Event()
  private readonly clickExpand: EventEmitter<void>;

  @Prop()
  public readonly config: VisualizerToolbarConfig;

  @Prop()
  public readonly layoutType: UnionVisualizerLayoutType = 'rows';

  render() {
    const {
      clickLayout,
      clickExpand,
    } = this;
    return (
      <Host>
        <div class="controls">
          <div class="alignRight">
            <tcs-dropdown
              slimText="Rec"
              config={{
                label: 'Layout',
                items: [
                  {
                    id: 'rows',
                    label: 'Rows',
                    onClick: clickLayout.emit.bind(this, 'rows' as UnionVisualizerLayoutType)
                  },
                  {
                    id: 'columns',
                    label: 'Columns',
                    onClick: clickLayout.emit.bind(this, 'columns' as UnionVisualizerLayoutType)
                  },
                  {
                    id: 'mix',
                    label: 'Mix',
                    onClick: clickLayout.emit.bind(this, 'mix' as UnionVisualizerLayoutType)
                  }
                ]
              }}
            />
            <tcs-button
              icon="expand"
              iconOnly
              onClick={clickExpand.emit.bind(this)}
            />
          </div>
        </div>
      </Host>
    );
  }
}
