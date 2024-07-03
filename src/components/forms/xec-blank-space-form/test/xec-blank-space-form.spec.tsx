import { newSpecPage } from '@stencil/core/testing';
import { XecBlankSpaceForm } from '../xec-blank-space-form';

describe('xec-blank-space-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecBlankSpaceForm],
      html: `<xec-blank-space-form></xec-blank-space-form>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-blank-space-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-blank-space-form>
    `);
  });
});
