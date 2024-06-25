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
  @Prop()
  public readonly outlined?: boolean;
  @Prop()
  public readonly rounded?: boolean;
  @Prop()
  public readonly iconOnly?: boolean;

  public onClickButton(): void {
    this.clickButton.emit();
  }

  public render() {
    const {
      onClickButton,
      variation,
      icon,
      outlined,
      rounded,
      iconOnly
    } = this;

    return (
      <Host
        onClick={onClickButton.bind(this)}
        class={classNames({
          outlined,
          rounded,
          iconOnly,
          [`variation-${variation}`]: true
        })}>
        {icon && (<xec-icon icon={icon} class="icon" />)}
        <slot />
      </Host>
    );
  }

}
