import { newSpecPage } from '@stencil/core/testing';
import { XecIcon } from '../xec-icon';

describe('xec-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecIcon],
      html: `<xec-icon></xec-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-icon>
    `);
  });
});
