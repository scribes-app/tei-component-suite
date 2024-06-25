import { Component, Host, h } from '@stencil/core';
import { JSX, Method, Prop } from '@stencil/core/internal';
import { QuillInstance, ToolbarConfig } from '../../lib/types';
import Quill from 'quill';

@Component({
  tag: 'xec-editor',
  styleUrls: [
    'xec-editor.scss'
  ],
  /**
   * We cannot scope the styles because Quill.js uses classes that do not exist before being rendered
   * The scope will be done using classic CSS selectors
   * Should be removed when Quill.js will be compatible with shadow DOM
   */
  scoped: false,
  /**
   * We disable the shadow DOM because Quill.js does not work with it
   * @see https://github.com/slab/quill/issues/2021
   */
  shadow: false,
})
export class XecEditor {

  private quillInstance?: QuillInstance;
  private editorElement?: HTMLDivElement;

  @Prop()
  public readonly config: ToolbarConfig = defaultToolbarConfig;

  @Method()
  public async getQuillInstance(): Promise<QuillInstance> {
    return this.quillInstance;
  }

  /**
   * Lifecycle hook called when the component has rendered
   */
  public componentDidLoad(): void {
    this.initQuill();
  }

  /**
   * Initialize the Quill editor
   */
  private initQuill(): void {
    this.quillInstance = new Quill(this.editorElement);
  }

  /**
   * Render the component
   */
  public render(): JSX.Element {
    const {
      config
    } = this;
    return (
      <Host>
        <xec-toolbar class="toolbar" config={config} />
        <div class="editor" ref={el => this.editorElement = el} />
      </Host>
    );
  }

}


const defaultToolbarConfig: ToolbarConfig = {
  controls: {
    viewRaw: true
  }
};
