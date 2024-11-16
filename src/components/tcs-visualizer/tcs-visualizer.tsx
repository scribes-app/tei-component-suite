import { Component, Host, Method, Prop, State, h } from '@stencil/core';
import classNames from 'classnames';
import OpenSeadragon from 'openseadragon';
import { capitalize, onClickOutside, removeClickOutside } from '../../lib/helper';
import { UnionCommentType, UnionVisualizerLayoutType, VisualizerToolbarConfig } from '../../lib/types';

@Component({
  tag: 'tcs-visualizer',
  styleUrl: 'tcs-visualizer.scss',
  shadow: true,
})
export class TcsVisualizer {

  private osViewer: OpenSeadragon.Viewer;
  private documentViewerElement: HTMLDivElement;
  private brightnessControlElement: HTMLDivElement;
  private contrastControlElement: HTMLDivElement;
  private brightnessButtonElement: HTMLTcsButtonElement;
  private contrastButtonElement: HTMLTcsButtonElement;
  private brightnessRangeElement: HTMLTcsRangeElement;
  private contrastRangeElement: HTMLTcsRangeElement;

  private _listeners: ReturnType<typeof onClickOutside>[] = [];

  @Prop({ mutable: true })
  public toolbarConfig: VisualizerToolbarConfig = defaultVisualizerToolbarConfig;

  @State()
  private activeCommentTab: UnionCommentType = 'line';

  @State()
  private layoutType: UnionVisualizerLayoutType = 'rows';

  @State()
  private brightness: number = 50;

  @State()
  private contrast: number = 50;

  @State()
  private expand: boolean = false;

  @State()
  private rangeOpen: { brightness: boolean; contrast: boolean } = {
    brightness: false,
    contrast: false
  }

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
    this.setOnClickOutside();
  }

  public disconnectedCallback(): void {
    this.osViewer.destroy();
    removeClickOutside(...this._listeners);
  }

  private setOnClickOutside() {
    const closeBrightnessRange = (() => this.rangeOpen = { ...this.rangeOpen, brightness: false }).bind(this);
    const closeContrastRange = (() => this.rangeOpen = { ...this.rangeOpen, contrast: false }).bind(this);
    removeClickOutside(...this._listeners);
    this._listeners = [
      onClickOutside(this.brightnessControlElement, closeBrightnessRange, this.brightnessButtonElement),
      onClickOutside(this.contrastControlElement, closeContrastRange, this.contrastButtonElement)
    ];
  }

  private onClickLayout(event: CustomEvent<UnionVisualizerLayoutType>) {
    this.layoutType = event.detail;
  }

  private onClickCommentDropdown(type: UnionCommentType): void {
    this.activeCommentTab = type;
  }

  private onControlRangeChange(type: 'brightness'|'contrast', event: CustomEvent<number>): void {
    this[type] = event.detail;
    const brigthnessValue = ((this.brightness - 50) / 100) + 1;
    const contrastValue = ((this.contrast - 50) / 100) + 1;
    this.osViewer.element.style.filter = `brightness(${brigthnessValue}) contrast(${contrastValue})`;
  }

  private onClickControlRange(type: 'brightness'|'contrast'): void {
    this.rangeOpen = {
      ...this.rangeOpen,
      [type]: !this.rangeOpen[type]
    }
  }

  private onClickZoomOut(): void {
    this.osViewer.viewport.zoomBy(.8);
  }

  private onClickZoomIn(): void {
    this.osViewer.viewport.zoomBy(1.2);
  }

  private onClickUndo(): void {
    this.osViewer.viewport.goHome(true);
    this.brightness= 50;
    this.contrast = 50;
    const brigthnessValue = ((this.brightness - 50) / 100) + 1;
    const contrastValue = ((this.contrast - 50) / 100) + 1;
    this.osViewer.element.style.filter = `brightness(${brigthnessValue}) contrast(${contrastValue})`;
    this.brightnessRangeElement.reset();
    this.contrastRangeElement.reset();
  }

  private onClickExpand(): void {
    this.expand = !this.expand;
  }

  render() {
    const {
      onClickLayout,
      onClickCommentDropdown,
      onControlRangeChange,
      onClickControlRange,
      onClickZoomOut,
      onClickZoomIn,
      onClickUndo,
      onClickExpand,
      activeCommentTab,
      layoutType,
      toolbarConfig,
      expand,
      rangeOpen
    } = this;
    return (
      <Host class={classNames({
        [layoutType]: true,
        expand
      })}>
        <div class="documentViewer">
          <div class="controls">
            <tcs-button
              icon="brightness"
              iconOnly
              outlined
              ref={(el) => this.brightnessButtonElement = el}
              onClick={onClickControlRange.bind(this, 'brightness')}
            />
            <div
              ref={(el) => this.brightnessControlElement = el}
              class={classNames({
                rangeControl: true,
                brightness: true,
                open: rangeOpen.brightness,
              })}>
              <tcs-range
                ref={el => this.brightnessRangeElement = el}
                defaultValue={50}
                onRangeChange={onControlRangeChange.bind(this, 'brightness')}
              />
            </div>
            <tcs-button
              icon="contrast"
              iconOnly
              outlined
              ref={(el) => this.contrastButtonElement = el}
              onClick={onClickControlRange.bind(this, 'contrast')}
            />
            <div
              ref={(el) => this.contrastControlElement = el}
              class={classNames({
                rangeControl: true,
                contrast: true,
                open: rangeOpen.contrast
              })}>
              <tcs-range
                ref={(el) => this.contrastRangeElement = el}
                defaultValue={50}
                onRangeChange={onControlRangeChange.bind(this, 'contrast')}
              />
            </div>
            <tcs-button
              icon="zoom-in"
              iconOnly
              outlined
              onClick={onClickZoomIn.bind(this)}
            />
            <tcs-button
              icon="zoom-out"
              iconOnly
              outlined
              onClick={onClickZoomOut.bind(this)}
            />
            <tcs-button
              icon="undo"
              iconOnly
              outlined
              onClick={onClickUndo.bind(this)}
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
            onClickExpand={onClickExpand.bind(this)}
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
