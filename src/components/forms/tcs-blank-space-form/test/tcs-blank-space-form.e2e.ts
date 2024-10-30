import { newE2EPage } from '@stencil/core/testing';

describe('tcs-blank-space-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-blank-space-form></tcs-blank-space-form>');

    const element = await page.find('tcs-blank-space-form');
    expect(element).toHaveClass('hydrated');
  });
});
