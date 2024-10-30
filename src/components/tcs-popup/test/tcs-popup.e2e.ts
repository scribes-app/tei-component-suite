import { newE2EPage } from '@stencil/core/testing';

describe('tcs-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-popup></tcs-popup>');

    const element = await page.find('tcs-popup');
    expect(element).toHaveClass('hydrated');
  });
});
