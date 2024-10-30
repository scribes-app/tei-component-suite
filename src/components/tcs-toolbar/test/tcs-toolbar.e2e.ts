import { newE2EPage } from '@stencil/core/testing';

describe('tcs-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-toolbar></tcs-toolbar>');

    const element = await page.find('tcs-toolbar');
    expect(element).toHaveClass('hydrated');
  });
});
