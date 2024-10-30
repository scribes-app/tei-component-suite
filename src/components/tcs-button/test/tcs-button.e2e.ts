import { newE2EPage } from '@stencil/core/testing';

describe('tcs-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-button></tcs-button>');

    const element = await page.find('tcs-button');
    expect(element).toHaveClass('hydrated');
  });
});
