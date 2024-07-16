import { newE2EPage } from '@stencil/core/testing';

describe('xec-settings-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-settings-form></xec-settings-form>');

    const element = await page.find('xec-settings-form');
    expect(element).toHaveClass('hydrated');
  });
});
