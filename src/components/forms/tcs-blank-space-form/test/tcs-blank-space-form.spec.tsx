import { newSpecPage } from '@stencil/core/testing';
import { TcsBlankSpaceForm } from '../tcs-blank-space-form';

describe('tcs-blank-space-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsBlankSpaceForm],
      html: `<tcs-blank-space-form></tcs-blank-space-form>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-blank-space-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-blank-space-form>
    `);
  });
});
