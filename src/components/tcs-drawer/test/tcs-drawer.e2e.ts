import { newE2EPage } from '@stencil/core/testing';

describe('tcs-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-drawer></tcs-drawer>');

    const element = await page.find('tcs-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
