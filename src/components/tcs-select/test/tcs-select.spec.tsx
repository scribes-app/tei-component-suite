import { newSpecPage } from '@stencil/core/testing';
import { TcsSelect } from '../tcs-select';

describe('tcs-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsSelect],
      html: `<tcs-select></tcs-select>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-select>
    `);
  });
});
