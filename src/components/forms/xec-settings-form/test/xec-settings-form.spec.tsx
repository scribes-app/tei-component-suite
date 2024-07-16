import { newSpecPage } from '@stencil/core/testing';
import { XecSettingsForm } from '../xec-settings-form';

describe('xec-settings-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XecSettingsForm],
      html: `<xec-settings-form></xec-settings-form>`,
    });
    expect(page.root).toEqualHtml(`
      <xec-settings-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xec-settings-form>
    `);
  });
});
