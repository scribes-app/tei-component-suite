import { newSpecPage } from '@stencil/core/testing';
import { TcsAnnotationForm } from '../tcs-annotation-form';

describe('tcs-annotation-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsAnnotationForm],
      html: `<tcs-annotation-form></tcs-annotation-form>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-annotation-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-annotation-form>
    `);
  });
});
