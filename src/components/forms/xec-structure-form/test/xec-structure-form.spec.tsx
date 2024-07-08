import { newSpecPage } from '@stencil/core/testing';
import { XecStructureForm } from '../xec-structure-form';

describe('xec-structure-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecStructureForm],
      html: `<xec-structure-form></xec-structure-form>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-structure-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-structure-form>
    `);
  });
});
