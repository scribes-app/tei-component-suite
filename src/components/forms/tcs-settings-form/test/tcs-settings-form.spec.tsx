import { newSpecPage } from '@stencil/core/testing';
import { TcsSettingsForm } from '../tcs-settings-form';

describe('tcs-settings-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TcsSettingsForm],
      html: `<tcs-settings-form></tcs-settings-form>`,
    });
    expect(page.root).toEqualHtml(`
      <tcs-settings-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tcs-settings-form>
    `);
  });
});
