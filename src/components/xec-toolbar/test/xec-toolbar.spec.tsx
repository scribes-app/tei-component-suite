import { newSpecPage } from '@stencil/core/testing';
import { XecToolbar } from '../xec-toolbar';

describe('xec-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecToolbar],
      html: `<xec-toolbar></xec-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-toolbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-toolbar>
    `);
  });
});
