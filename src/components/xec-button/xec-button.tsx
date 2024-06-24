import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';
import { UnionIcons } from '../../lib/types';

@Component({
  tag: 'xec-button',
  styleUrl: 'xec-button.scss',
  shadow: true,
})
export class XecButton {

  @Event()
  public readonly clickButton: EventEmitter<HTMLDivElement>;

  @Prop()
  public readonly variation?: 'default' = 'default';
  @Prop()
  public readonly icon?: UnionIcons;

  public onClickButton(): void {
    this.clickButton.emit();
  }

  public render() {
    const {
      onClickButton,
      variation,
    } = this;

    return (
      <Host
        onClick={onClickButton.bind(this)}
        class={classNames({
          [`variation-${variation}`]: true
        })}>
        {this.icon && (<xec-icon icon={this.icon} class="icon" />)}
        <slot />
      </Host>
    );
  }

}
