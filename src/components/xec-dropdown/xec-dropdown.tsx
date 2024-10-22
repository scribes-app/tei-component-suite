import { Component, Element, Host, Method, Prop, State, h } from '@stencil/core';
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
        <xec-button
          onClickButton={onClickDropdown.bind(this)}
          active={isOpen}
          icon="angle-down"
          iconPosition="trailing"
          disabled={disabled}
          display={display}
          slimText={slimText}
          rotateOnActive>
          {label}
        </xec-button>
        <div class={classNames({
          wrapper: true,
          open: isOpen
        })}>
          {items.map(({ label, items, onClick }) => (
            <xec-button stretched class="item" onClickButton={onClickItem.bind(this, onClick)}>
              {label}
              {items && items.map(({ label, onClick }) => {
                <xec-button stretched class="item" onClickButton={onClickItem.bind(this, onClick)}>
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
