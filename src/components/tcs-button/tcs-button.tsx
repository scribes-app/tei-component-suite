import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';
import { UnionIcons } from '../../lib/types';

@Component({
  tag: 'tcs-button',
  styleUrl: 'tcs-button.scss',
  shadow: true,
})
export class TcsButton {

  @Event()
  private readonly clickButton: EventEmitter<HTMLDivElement>;

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
  public readonly disabled?: boolean;

  @Prop()
  public readonly iconOnly?: boolean;

  @Prop()
  public readonly active?: boolean;

  @Prop()
  public readonly display?: 'slim'|'default' = 'default';

  @Prop()
  public readonly slimText?: string;

  @Prop()
  public readonly rotateOnActive?: boolean;

  public onClickButton(): void {
    if (!this.disabled) this.clickButton.emit();
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
      disabled,
      active,
      display,
      slimText
    } = this;

    return (
      <Host
        onClick={onClickButton.bind(this)}
        class={classNames({
          outlined,
          rounded,
          iconOnly,
          active,
          disabled,
          rotateOnActive,
          stretched,
          [`display-${display}`]: true,
          [`icon-position-${iconPosition}`]: true,
          [`variation-${variation}`]: true
        })}>
        {icon && iconPosition === 'leading' && (<tcs-icon icon={icon} class="icon" />)}
        {display === 'default' && (
          <slot />
        )}
        {display === 'slim' && (
          <div class="slimText">
            {slimText}
          </div>
        )}
        {icon && iconPosition === 'trailing' && (<tcs-icon icon={icon} class="icon" />)}
      </Host>
    );
  }

}
