import { newSpecPage } from '@stencil/core/testing';
import { TcsVisualizer } from '../tcs-visualizer';

describe('tcs-visualizer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsVisualizer],
      html: `<tcs-visualizer></tcs-visualizer>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-visualizer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-visualizer>
    `);
  });
});
