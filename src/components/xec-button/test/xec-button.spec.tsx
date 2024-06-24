import { newSpecPage } from '@stencil/core/testing';
import { XecButton } from '../xec-button';

describe('xec-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecButton],
      html: `<xec-button></xec-button>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-button>
    `);
  });
});
