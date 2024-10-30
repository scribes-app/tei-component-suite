import { newSpecPage } from '@stencil/core/testing';
import { TcsEditor } from '../tcs-editor';

describe('tcs-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsEditor],
      html: `<tcs-editor></tcs-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-editor>
    `);
  });
});
