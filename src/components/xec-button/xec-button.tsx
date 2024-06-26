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
  public readonly iconPosition?: 'leading' | 'trailing' = 'leading';

  @Prop()
  public readonly stretched?: boolean;

  @Prop()
  public readonly outlined?: boolean;

  @Prop()
  public readonly rounded?: boolean;

  @Prop()
  public readonly iconOnly?: boolean;

  @Prop()
  public readonly active?: boolean;

  @Prop()
  public readonly rotateOnActive?: boolean;

  public onClickButton(): void {
    this.clickButton.emit();
  }

  public render() {
    const {
      onClickButton,
      variation,
      icon,
      iconPosition,
      outlined,
      rounded,
      stretched,
      iconOnly,
      rotateOnActive,
      active
    } = this;

    return (
      <Host
        onClick={onClickButton.bind(this)}
        class={classNames({
          outlined,
          rounded,
          iconOnly,
          active,
          rotateOnActive,
          stretched,
          [`icon-position-${iconPosition}`]: true,
          [`variation-${variation}`]: true
        })}>
        {icon && iconPosition === 'leading' && (<xec-icon icon={icon} class="icon" />)}
        <slot />
        {icon && iconPosition === 'trailing' && (<xec-icon icon={icon} class="icon" />)}
      </Host>
    );
  }

}
