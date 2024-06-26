import { Component, Host, Prop, State, h } from '@stencil/core';
import { DropdownConfig } from '../../lib/types';
import classNames from 'classnames';

@Component({
  tag: 'xec-dropdown',
  styleUrl: 'xec-dropdown.scss',
  shadow: true,
})
export class XecDropdown {

  @Prop()
  public readonly config: DropdownConfig = {
    label: '__dropdown_label',
    items: []
  };

  @State()
  private open = false;

  private onClickDropdown(): void {
    this.open = !this.open;
  }

  render() {
    const {
      onClickDropdown,
      config: { items, label },
      open
    } = this;
    return (
      <Host>
        <xec-button onClickButton={onClickDropdown.bind(this)} active={open} icon="angle-down" iconPosition="trailing" rotateOnActive>
          {label}
        </xec-button>
        <div class={classNames({
          wrapper: true,
          open
        })}>
          {items.map(({ label, items, onClick }) => (
            <xec-button stretched class="item" onClick={onClick}>
              {label}
              {items && items.map(({ label, onClick }) => {
                <xec-button stretched class="item" onClick={onClick}>
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
