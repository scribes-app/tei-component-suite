import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { DropdownConfig } from '../../lib/types';
import classNames from 'classnames';
import { onClickOutside, removeClickOutside } from '../../lib/helper';

@Component({
  tag: 'xec-dropdown',
  styleUrl: 'xec-dropdown.scss',
  shadow: true,
})
export class XecDropdown {

  private _listener: ReturnType<typeof onClickOutside>;

  @Element()
  private element: HTMLElement;

  @Prop()
  public readonly config: DropdownConfig = {
    label: '__dropdown_label',
    items: []
  };

  @Prop()
  public readonly shouldCloseOnClickOutside?: (e: MouseEvent) => boolean;

  @State()
  private open = false;

  public componentDidLoad() {
    this.setOnClickOutside();
  }

  public disconnectedCallback() {
    removeClickOutside(this._listener);
  }

  private setOnClickOutside(): void {
    this._listener = this.onClickOutside.bind(this);
    onClickOutside(this.element, this._listener, this.shouldCloseOnClickOutside);
  }

  private onClickDropdown(): void {
    this.open = !this.open;
  }

  private onClickOutside(): void {
    if (this.open) this.open = false;
  }

  render() {
    const {
      onClickDropdown,
      config: { items, label },
      open
    } = this;
    return (
      <Host>
        <xec-button
          onClickButton={onClickDropdown.bind(this)}
          active={open}
          icon="angle-down"
          iconPosition="trailing"
          rotateOnActive>
          {label}
        </xec-button>
        <div class={classNames({
          wrapper: true,
          open
        })}>
          {items.map(({ label, items, onClick }) => (
            <xec-button stretched class="item" onClickButton={onClick}>
              {label}
              {items && items.map(({ label, onClick }) => {
                <xec-button stretched class="item" onClickButton={onClick}>
                  {label}
                </xec-button>
              })}
            </xec-button>
          ))}
        </div>
      </Host>
    );
  }

}
