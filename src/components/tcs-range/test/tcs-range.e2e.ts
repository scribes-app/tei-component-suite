import { newE2EPage } from '@stencil/core/testing';

describe('tcs-range', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-range></tcs-range>');

    const element = await page.find('tcs-range');
    expect(element).toHaveClass('hydrated');
  });
});
