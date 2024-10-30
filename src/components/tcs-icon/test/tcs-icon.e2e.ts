import { newE2EPage } from '@stencil/core/testing';

describe('tcs-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-icon></tcs-icon>');

    const element = await page.find('tcs-icon');
    expect(element).toHaveClass('hydrated');
  });
});
