import { newSpecPage } from '@stencil/core/testing';
import { TcsViewer } from '../tcs-viewer';

describe('tcs-viewer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsViewer],
      html: `<tcs-viewer></tcs-viewer>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-viewer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-viewer>
    `);
  });
});
