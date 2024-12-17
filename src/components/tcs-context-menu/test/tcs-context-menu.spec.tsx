import { newSpecPage } from '@stencil/core/testing';
import { TcsContextMenu } from '../tcs-context-menu';

describe('tcs-context-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsContextMenu],
      html: `<tcs-context-menu></tcs-context-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-context-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-context-menu>
    `);
  });
});
