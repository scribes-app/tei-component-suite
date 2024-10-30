import { newSpecPage } from '@stencil/core/testing';
import { TcsIcon } from '../tcs-icon';

describe('tcs-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsIcon],
      html: `<tcs-icon></tcs-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-icon>
    `);
  });
});
