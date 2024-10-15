import { Component, Host, Method, State, h } from '@stencil/core';
import { Element, JSX } from '@stencil/core/internal';
import classNames from 'classnames';
import { onClickOutside, removeClickOutside } from '../../lib/helper';

@Component({
  tag: 'xec-popup',
  styleUrl: 'xec-popup.scss',
  shadow: true,
})
export class XecPopup {

  private _listener: ReturnType<typeof onClickOutside>;
  private openedTimestamp: number = 0;

  @Element()
  private element: HTMLElement;

  @State()
  private open: boolean = false;

  @State()
  private content?: string|JSX.Element;

  @Method()
  public async openPopup(): Promise<void> {
    this.open = true;
    this.openedTimestamp = Date.now();
  }

  @Method()
  public async closePopup(): Promise<void> {
    this.open = false;
  }

  @Method()
  public async setContent(content: string): Promise<void> {
    this.content = content;
  }

  componentDidLoad() {
    this._listener = onClickOutside(this.element, this.onClickOutside.bind(this));
  }

  disconnectedCallback() {
    removeClickOutside(this._listener);
  }

  private onClickOutside(): void {
    if (Date.now() - this.openedTimestamp > 100) {
      this.closePopup();
    }
  }

  private onClickClose(): void {
    this.closePopup();
  }

  render() {
    const {
      onClickClose,
      content,
      open
    } = this;
    return (
      <Host class={classNames({
        open
      })}>
        <xec-button class="close" icon="cross" onClickButton={onClickClose.bind(this)} rounded iconOnly />
        <div class="content">
          <slot>
            {content}
          </slot>
        </div>
      </Host>
    );
  }

}
