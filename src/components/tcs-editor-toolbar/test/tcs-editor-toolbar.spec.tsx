import { newSpecPage } from '@stencil/core/testing';
import { TcsEditorToolbar } from '../tcs-editor-toolbar';

describe('tcs-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsEditorToolbar],
      html: `<tcs-editor-toolbar></tcs-editor-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-editor-toolbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-editor-toolbar>
    `);
  });
});
