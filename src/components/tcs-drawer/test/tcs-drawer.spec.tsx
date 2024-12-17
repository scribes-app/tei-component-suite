import { newSpecPage } from '@stencil/core/testing';
import { TcsDrawer } from '../tcs-drawer';

describe('tcs-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsDrawer],
      html: `<tcs-drawer></tcs-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-drawer>
    `);
  });
});
