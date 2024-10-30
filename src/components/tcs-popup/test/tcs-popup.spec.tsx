import { newSpecPage } from '@stencil/core/testing';
import { TcsPopup } from '../tcs-popup';

describe('tcs-popup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsPopup],
      html: `<tcs-popup></tcs-popup>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-popup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-popup>
    `);
  });
});
