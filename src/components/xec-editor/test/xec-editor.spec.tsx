import { newSpecPage } from '@stencil/core/testing';
import { XecEditor } from '../xec-editor';

describe('xec-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecEditor],
      html: `<xec-editor></xec-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-editor>
    `);
  });
});
