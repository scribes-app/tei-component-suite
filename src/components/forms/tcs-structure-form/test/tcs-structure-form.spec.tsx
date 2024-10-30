import { newSpecPage } from '@stencil/core/testing';
import { TcsStructureForm } from '../tcs-structure-form';

describe('tcs-structure-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsStructureForm],
      html: `<tcs-structure-form></tcs-structure-form>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-structure-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-structure-form>
    `);
  });
});
