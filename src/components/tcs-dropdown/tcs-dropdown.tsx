import { Component, Element, Host, Method, Prop, State, h } from '@stencil/core';
import { DropdownConfig } from '../../lib/types';
import classNames from 'classnames';
import { onClickOutside, removeClickOutside } from '../../lib/helper';

@Component({
  tag: 'tcs-dropdown',
  styleUrl: 'tcs-dropdown.scss',
  shadow: true,
})
export class TcsDropdown {

  private _listener: ReturnType<typeof onClickOutside>;

  @Element()
  private element: HTMLElement;

  @Prop()
  public readonly config: DropdownConfig = {
    label: '__dropdown_label',
    items: []
  };

  @Prop()
  public readonly disabled: boolean = false;

  @Prop()
  public readonly display?: 'slim'|'default' = 'default';

  @Prop()
  public readonly slimText?: string;

  @State()
  private isOpen = false;

  @Method()
  public async close(): Promise<void> {
    this.isOpen = false;
  }

  @Method()
  public async open(): Promise<void> {
    this.isOpen = true;
  }

  public componentDidLoad() {
    this.setOnClickOutside();
  }

  public disconnectedCallback() {
    removeClickOutside(this._listener);
  }

  private setOnClickOutside(): void {
    this._listener = this.onClickOutside.bind(this);
    onClickOutside(this.element, this._listener);
  }

  private onClickDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  private onClickOutside(): void {
    this.isOpen = false;
  }

  private onClickItem(handler: () => any): void {
    handler();
    this.isOpen = false;
  }

  render() {
    const {
      onClickDropdown,
      onClickItem,
      config: { items, label },
      disabled,
      display,
      slimText,
      isOpen
    } = this;
    return (
      <Host>
        <tcs-button
          onClickButton={onClickDropdown.bind(this)}
          active={isOpen}
          icon="angle-down"
          iconPosition="trailing"
          disabled={disabled}
          display={display}
          slimText={slimText}
          rotateOnActive>
          {label}
        </tcs-button>
        <div class={classNames({
          wrapper: true,
          open: isOpen
        })}>
          {items.map(({ label, items, onClick }) => (
            <tcs-button stretched class="item" onClickButton={onClickItem.bind(this, onClick)}>
              {label}
              {items && items.map(({ label, onClick }) => {
                <tcs-button stretched class="item" onClickButton={onClickItem.bind(this, onClick)}>
                  {label}
                </tcs-button>
              })}
            </tcs-button>
          ))}
        </div>
      </Host>
    );
  }

}
