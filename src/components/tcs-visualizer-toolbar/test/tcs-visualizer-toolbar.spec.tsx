import { newSpecPage } from '@stencil/core/testing';
import { TcsVisualizerToolbar } from '../tcs-visualizer-toolbar';

describe('tcs-visualizer-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsVisualizerToolbar],
      html: `<tcs-visualizer-toolbar></tcs-visualizer-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-visualizer-toolbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-visualizer-toolbar>
    `);
  });
});
