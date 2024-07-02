import { newSpecPage } from '@stencil/core/testing';
import { XecTextfield } from '../xec-textfield';

describe('xec-textfield', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecTextfield],
      html: `<xec-textfield></xec-textfield>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-textfield>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-textfield>
    `);
  });
});
