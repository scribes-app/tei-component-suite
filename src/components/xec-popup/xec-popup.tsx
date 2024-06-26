import { Component, Host, Method, State, h } from '@stencil/core';
import { JSX } from '@stencil/core/internal';
import classNames from 'classnames';

@Component({
  tag: 'xec-popup',
  styleUrl: 'xec-popup.scss',
  shadow: true,
})
export class XecPopup {

  @State()
  private open: boolean = false;

  @State()
  private content?: string|JSX.Element;

  @Method()
  public async openPopup(): Promise<void> {
    this.open = true;
  }

  @Method()
  public async closePopup(): Promise<void> {
    this.open = false;
  }

  @Method()
  public async setContent(content: string): Promise<void> {
    this.content = content;
  }

  onClickClose(): void {
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
