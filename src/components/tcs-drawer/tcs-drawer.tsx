import { Component, Host, Method, Prop, State, h } from '@stencil/core';
import { marked } from 'marked';

@Component({
  tag: 'tcs-drawer',
  styleUrl: 'tcs-drawer.scss',
  shadow: true,
})
export class TcsDrawer {

  @Prop()
  public readonly markdown?: string;

  @Prop()
  public readonly html?: string;

  @State()
  public readonly isOpen: boolean = false;

  @Method()
  async open(): Promise<void> {}

  @Method()
  async close(): Promise<void> {}

  render() {
    const {
      close,
      isOpen,
      markdown,
      html
    } = this;
    return (
      <Host class={{
        open: isOpen,
      }}>
        <tcs-button class="close" icon="cross" onClickButton={close.bind(this)} rounded iconOnly />
        <div class="content" innerHTML={html}>
          {markdown && marked(markdown)}
        </div>
      </Host>
    );
  }
}
