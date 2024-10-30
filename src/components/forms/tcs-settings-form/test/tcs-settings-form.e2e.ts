import { newE2EPage } from '@stencil/core/testing';

describe('tcs-settings-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-settings-form></tcs-settings-form>');

    const element = await page.find('tcs-settings-form');
    expect(element).toHaveClass('hydrated');
  });
});
