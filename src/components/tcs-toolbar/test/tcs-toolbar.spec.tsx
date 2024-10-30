import { newSpecPage } from '@stencil/core/testing';
import { TcsToolbar } from '../tcs-toolbar';

describe('tcs-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsToolbar],
      html: `<tcs-toolbar></tcs-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-toolbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-toolbar>
    `);
  });
});
