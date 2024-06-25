import { Component, Host, h } from '@stencil/core';
import { Event, EventEmitter, JSX, Prop, Watch } from '@stencil/core/internal';
import { isEqual } from '../../lib/helper';
import { ToolbarConfig } from '../../lib/types';

@Component({
  tag: 'xec-toolbar',
  styleUrl: 'xec-toolbar.scss',
  shadow: true,
})
export class XecToolbar {

  @Event()
  clickViewRaw: EventEmitter<void>;

  @Prop()
  public readonly config: ToolbarConfig;

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
      config
    } = this;
    return (
      <Host>
        <div class="controls">
          {config.controls.viewRaw && (<xec-button onClickButton={clickViewRaw.emit.bind(this)} iconOnly icon="code-simple" />)}
        </div>
      </Host>
    );
  }

}
