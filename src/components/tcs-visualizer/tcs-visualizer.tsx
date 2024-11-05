import { Component, Host, Method, Prop, State, h } from '@stencil/core';
import classNames from 'classnames';
import OpenSeadragon from 'openseadragon';
import { capitalize } from '../../lib/helper';
import { UnionCommentType, UnionVisualizerLayoutType, VisualizerToolbarConfig } from '../../lib/types';

@Component({
  tag: 'tcs-visualizer',
  styleUrl: 'tcs-visualizer.scss',
  shadow: true,
})
export class TcsVisualizer {

  private osViewer: OpenSeadragon.Viewer;
  private documentViewerElement: HTMLDivElement;


  @Prop({ mutable: true })
  public toolbarConfig: VisualizerToolbarConfig = defaultVisualizerToolbarConfig;

  @State()
  private activeCommentTab: UnionCommentType = 'line';

  @State()
  private layoutType: UnionVisualizerLayoutType = 'rows';

  @Method()
  public async setDocumentViewerImage(source: OpenSeadragon.TileSourceOptions): Promise<void> {
    this.osViewer.open(source);
  }

  public componentDidLoad(): void {
    this.osViewer = OpenSeadragon({
      element: this.documentViewerElement,
      showFullPageControl: false,
      showHomeControl: false,
      showZoomControl: false,
    });
  }

  private onClickLayout(event: CustomEvent<UnionVisualizerLayoutType>) {
    this.layoutType = event.detail;
  }

  private onClickCommentDropdown(type: UnionCommentType): void {
    this.activeCommentTab = type;
  }

  render() {
    const {
      onClickLayout,
      onClickCommentDropdown,
      activeCommentTab,
      layoutType,
      toolbarConfig
    } = this;
    return (
      <Host class={classNames({
        [layoutType]: true,
      })}>
        <div class="documentViewer">
          <div class="controls">
            <tcs-button
              icon="brightness"
              iconOnly
              outlined
            />
            <tcs-button
              icon="contrast"
              iconOnly
              outlined
            />
            <tcs-button
              icon="zoom-in"
              iconOnly
              outlined
            />
            <tcs-button
              icon="zoom-out"
              iconOnly
              outlined
            />
          </div>
          <div class="viewer" ref={ref => this.documentViewerElement = ref}></div>
        </div>
        <div class="dataViewer">
          <tcs-visualizer-toolbar
            class="toolbar"
            config={toolbarConfig}
            layoutType={layoutType}
            onClickLayout={onClickLayout.bind(this)}
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
            })}>
              <tcs-dropdown
                config={{
                  label: capitalize(activeCommentTab.replace('comment_', '')),
                  items: [
                    {
                      id: 'line',
                      label: 'Line',
                      onClick: onClickCommentDropdown.bind(this, 'line')
                    },
                    {
                      id: 'verse',
                      label: 'Verse',
                      onClick: onClickCommentDropdown.bind(this, 'verse')
                    }
                  ]
                }}
              />
            </div>
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
