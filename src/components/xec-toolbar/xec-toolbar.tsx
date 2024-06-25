import { Component, Host, h } from '@stencil/core';
import { Event, EventEmitter, Fragment, JSX, Prop, Watch } from '@stencil/core/internal';
import { isEqual } from '../../lib/helper';
import { ToolbarConfig } from '../../lib/types';
import classNames from 'classnames';

@Component({
  tag: 'xec-toolbar',
  styleUrl: 'xec-toolbar.scss',
  shadow: true,
})
export class XecToolbar {

  @Event()
  clickViewRaw: EventEmitter<void>;

  @Event()
  clickRTL: EventEmitter<void>;

  @Event()
  clickLTR: EventEmitter<void>;

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

  public render(): JSX.Element {
    const {
      clickViewRaw,
      clickRTL,
      clickLTR,
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
        </div>
      </Host>
    );
  }

}
