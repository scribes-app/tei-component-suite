import { Component, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import OpenSeadragon from 'openseadragon';
import { capitalize } from '../../lib/helper';
import { UnionCommentType, UnionVisualizerLayoutType, UnionVisualizerType, VisualizerFormattedTEI, VisualizerToolbarConfig } from '../../lib/types';
import { XMLTransformerService } from '../../services/xml-transformer.service';
import { TcsContextMenu } from '../tcs-context-menu/tcs-context-menu';

@Component({
  tag: 'tcs-visualizer',
  styleUrl: 'tcs-visualizer.scss',
  shadow: true,
})
export class TcsVisualizer {

  private viewerElements: Map<UnionVisualizerType, HTMLDivElement> = new Map();
  private activeViewer: UnionVisualizerType = 'transcribe';
  private drawerElement: HTMLTcsDrawerElement;
  private viewerElement: HTMLTcsViewerElement;
  private contextMenuElement: HTMLTcsContextMenuElement;

  @Prop({ mutable: true })
  public toolbarConfig: VisualizerToolbarConfig = defaultVisualizerToolbarConfig;

  @Prop()
  public contextMenuLinks: TcsContextMenu['controls'] = [];

  @Prop()
  public tei: VisualizerFormattedTEI;

  @State()
  private activeCommentTab: UnionCommentType = 'line';

  @State()
  private layoutType: UnionVisualizerLayoutType = 'rows';

  @State()
  private textSize: 's'|'m'|'l'|'xl'|'xxl' = 's';

  @State()
  private expand: boolean = false;

  @State()
  private documentViewerOpen = true;


  @Method()
  public async getDrawer(): Promise<HTMLTcsDrawerElement> {
    return this.drawerElement;
  }

  @Method()
  public async setDocumentViewerImage(source: OpenSeadragon.TileSourceOptions): Promise<void> {
    this.viewerElement.setDocumentViewerImage(source);
  }

  @Watch('tei')
  public async watchTEI(): Promise<void> {
    const transform = (content: string): string => {
      return XMLTransformerService.addClasses(
        XMLTransformerService.XML2Editor(
          XMLTransformerService.TEI2XML(content)
        )
      );
    };

    for (const [editorType, element] of this.viewerElements.entries()) {
      if (this.tei[editorType]) element.innerHTML = transform(this.tei[editorType]);
    }
  }

  public componentDidLoad(): void {
    this.setOnClickContextMenu();
  }

  private setOnClickContextMenu(): void {
    this.viewerElements.forEach(el => el.addEventListener('contextmenu', this.onClickContextMenu.bind(this, el)));
  }

  private onClickLayout() {
    const layouts: (typeof this.layoutType)[] = ['rows', 'columns', 'mix'];
    const index = layouts.indexOf(this.layoutType);
    this.layoutType = layouts[(index + 1) % layouts.length];
  }

  private onClickViewer() {
    this.documentViewerOpen = !this.documentViewerOpen;
  }

  private onClickContextMenu(_viewer: HTMLDivElement, e: MouseEvent): void {
    e.preventDefault();
    this.contextMenuElement.open(e.clientX, e.clientY);
  }

  private onClickTextSize(): void {
    const sizes: (typeof TcsVisualizer.prototype.textSize)[] = [
      's', 'm', 'l', 'xl', 'xxl'
    ];
    const currentIndex = sizes.indexOf(this.textSize);
    const nextIndex = currentIndex === sizes.length - 1 ? 0 : currentIndex + 1;
    this.textSize = sizes[nextIndex];
  }

  private onClickCommentDropdown(type: UnionCommentType): void {
    this.activeCommentTab = type;
  }

  private onClickExpand(): void {
    this.expand = !this.expand;
  }

  render() {
    const {
      onClickLayout,
      onClickCommentDropdown,
      onClickExpand,
      onClickTextSize,
      onClickViewer,
      textSize,
      activeCommentTab,
      contextMenuLinks,
      layoutType,
      toolbarConfig,
      documentViewerOpen,
      expand,
    } = this;
    return (
      <Host class={classNames({
        [layoutType]: true,
        expand,
        documentViewerOpen
      })}>
        <tcs-viewer
          class="documentViewer"
          ref={ref => this.viewerElement = ref}
        />
        <div class="dataViewer">
          <tcs-visualizer-toolbar
            class="toolbar"
            config={toolbarConfig}
            layoutType={layoutType}
            onClickViewer={onClickViewer.bind(this)}
            onClickTextSize={onClickTextSize.bind(this)}
            onClickLayout={onClickLayout.bind(this)}
            onClickExpand={onClickExpand.bind(this)}
          />
          <div class="viewers">
            <div class={classNames({
                viewer: true,
                transcribe: true,
                ['text-size-' + textSize]: true
              })}>
              <div
                class="viewerContent"
                ref={ref => this.viewerElements.set('transcribe', ref)}
                onMouseEnter={() => this.activeViewer = 'transcribe'}
              />
            </div>
            <div class={classNames({
                viewer: true,
                translate: true,
                ['text-size-' + textSize]: true
              })}>
              <div
                class="viewerContent"
                ref={ref => this.viewerElements.set('translate', ref)}
                onMouseEnter={() => this.activeViewer = 'translate'}
              />
            </div>
            <div class={classNames({
                viewer: true,
                comment: true,
                ['text-size-' + textSize]: true
              })}>
              <div
                class={classNames({ viewerContent: true, hidden: activeCommentTab === 'line' })}
                ref={ref => this.viewerElements.set('comment_verse', ref)}
                onMouseEnter={() => this.activeViewer = 'comment_verse'}
              />
              <div
                class={classNames({ viewerContent: true, hidden: activeCommentTab === 'verse' })}
                ref={ref => this.viewerElements.set('comment_line', ref)}
                onMouseEnter={() => this.activeViewer = 'comment_line'}
              />
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
        <tcs-context-menu
          ref={el => this.contextMenuElement = el}
          controls={[
            {
              label: 'Copy selection',
              icon: 'duplicate',
              onClick: selection => globalThis.navigator.clipboard.writeText(selection.toString())
            },
            {
              label: 'Copy entire XML',
              icon: 'document',
              onClick: () => globalThis.navigator.clipboard.writeText(this.tei[this.activeViewer] ?? '')
            },
            ...contextMenuLinks
          ]}
        />
        <tcs-drawer
          ref={el => this.drawerElement = el}
        />
      </Host>
    );
  }
}

const defaultVisualizerToolbarConfig: VisualizerToolbarConfig = {
  controls: {
    layout: true,
  },
};
