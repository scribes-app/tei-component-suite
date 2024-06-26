import { newSpecPage } from '@stencil/core/testing';
import { XecPopup } from '../xec-popup';

describe('xec-popup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecPopup],
      html: `<xec-popup></xec-popup>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-popup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-popup>
    `);
  });
});
