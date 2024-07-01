import { Component, Host, h } from '@stencil/core';
import { Element, Event, EventEmitter, Fragment, JSX, Prop, Watch } from '@stencil/core/internal';
import { isEqual } from '../../lib/helper';
import { ToolbarConfig, UnionUnclearReason } from '../../lib/types';
import classNames from 'classnames';

@Component({
  tag: 'xec-toolbar',
  styleUrl: 'xec-toolbar.scss',
  shadow: true,
})
export class XecToolbar {

  @Element()
  private element: HTMLElement;

  @Event()
  private readonly clickViewRaw: EventEmitter<void>;

  @Event()
  private readonly clickViewXML: EventEmitter<void>;

  @Event()
  private readonly clickUnclear: EventEmitter<UnionUnclearReason>;

  @Event()
  private readonly clickRTL: EventEmitter<void>;

  @Event()
  private readonly clickLTR: EventEmitter<void>;

  @Prop()
  public readonly config: ToolbarConfig;

  @Prop()
  public readonly textDirection: 'LTR'|'RTL' = 'LTR';

  @Prop()
  public readonly viewRaw: boolean = false;

  @Prop()
  public readonly disabled: boolean = false;

  @Watch('config')
  public watchConfig(next: ToolbarConfig, prev: ToolbarConfig): void {
    if (!isEqual(next, prev)) this.initConfig();
  }

  private initConfig(): void {
    // Do something with the config
  }

  /**
   * Check if the dropdown should close on click outside
   */
  private shouldCloseOnClickOutside(e: MouseEvent): boolean {
    return e.target !== this.element;
  }

  public render(): JSX.Element {
    const {
      shouldCloseOnClickOutside,
      clickViewRaw,
      clickRTL,
      clickLTR,
      clickViewXML,
      clickUnclear,
      textDirection,
      viewRaw,
      disabled,
      config
    } = this;
    return (
      <Host class={classNames({
        disabled
      })}>
        <div class="controls">
          {config.controls.viewRaw && (
            <xec-button active={viewRaw} onClickButton={clickViewRaw.emit.bind(this)} iconOnly icon="code-simple" />
          )}
          {config.controls.textDirection && (
            <Fragment>
              <xec-button active={textDirection === 'LTR'} onClickButton={clickLTR.emit.bind(this)} iconOnly icon="align-left" />
              <xec-button active={textDirection === 'RTL'} onClickButton={clickRTL.emit.bind(this)} iconOnly icon="align-right" />
            </Fragment>
          )}
          {config.controls.unclear && (
            <xec-dropdown
              shouldCloseOnClickOutside={shouldCloseOnClickOutside.bind(this)}
              config={{
                label: 'Unclear',
                items: [
                  {
                    id: 'legible_incomplete',
                    label: 'Legible incomplete',
                    onClick: clickUnclear.emit.bind(this, 'legible_incomplete')
                  },
                  {
                    id: 'uncertain',
                    label: 'Uncertain',
                    onClick: clickUnclear.emit.bind(this, 'uncertain')
                  },
                  {
                    id: 'faded',
                    label: 'Faded',
                    onClick: clickUnclear.emit.bind(this, 'faded')
                  },
                  {
                    id: 'background_noise',
                    label: 'Background noise',
                    onClick: clickUnclear.emit.bind(this, 'background_noise')
                  }
                ]
              }}
            />
          )}
          {config.controls.viewXML && (
            <xec-button onClickButton={clickViewXML.emit.bind(this)}>
              View XML
            </xec-button>
          )}
        </div>
      </Host>
    );
  }

}
