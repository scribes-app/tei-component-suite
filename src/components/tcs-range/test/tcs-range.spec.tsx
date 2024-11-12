import { newSpecPage } from '@stencil/core/testing';
import { TcsRange } from '../tcs-range';

describe('tcs-range', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsRange],
      html: `<tcs-range></tcs-range>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-range>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-range>
    `);
  });
});
