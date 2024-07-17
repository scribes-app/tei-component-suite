import { newSpecPage } from '@stencil/core/testing';
import { XecAnnotationForm } from '../xec-annotation-form';

describe('xec-annotation-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecAnnotationForm],
      html: `<xec-annotation-form></xec-annotation-form>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-annotation-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-annotation-form>
    `);
  });
});
