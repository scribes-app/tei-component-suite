import { newSpecPage } from '@stencil/core/testing';
import { XecSelect } from '../xec-select';

describe('xec-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecSelect],
      html: `<xec-select></xec-select>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-select>
    `);
  });
});
