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
  public isOpen: boolean = false;

  @Method()
  async open(): Promise<void> {
    this.isOpen = true;
  }

  @Method()
  async close(): Promise<void> {
    this.isOpen = false;
  }

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
        <div class="scroller">
          <tcs-button class="close" icon="cross" onClickButton={close.bind(this)} rounded iconOnly />
          <div class="content" innerHTML={html ?? (markdown && marked(markdown) as string)} />
        </div>
      </Host>
    );
  }
}
