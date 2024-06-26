import { newSpecPage } from '@stencil/core/testing';
import { XecDropdown } from '../xec-dropdown';

describe('xec-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecDropdown],
      html: `<xec-dropdown></xec-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-dropdown>
    `);
  });
});
