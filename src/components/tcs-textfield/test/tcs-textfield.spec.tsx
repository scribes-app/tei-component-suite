import { newSpecPage } from '@stencil/core/testing';
import { TcsTextfield } from '../tcs-textfield';

describe('tcs-textfield', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsTextfield],
      html: `<tcs-textfield></tcs-textfield>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-textfield>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-textfield>
    `);
  });
});
