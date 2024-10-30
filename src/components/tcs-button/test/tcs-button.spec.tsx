import { newSpecPage } from '@stencil/core/testing';
import { TcsButton } from '../tcs-button';

describe('tcs-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsButton],
      html: `<tcs-button></tcs-button>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-button>
    `);
  });
});
