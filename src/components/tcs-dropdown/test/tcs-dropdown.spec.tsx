import { newSpecPage } from '@stencil/core/testing';
import { TcsDropdown } from '../tcs-dropdown';

describe('tcs-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsDropdown],
      html: `<tcs-dropdown></tcs-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-dropdown>
    `);
  });
});
