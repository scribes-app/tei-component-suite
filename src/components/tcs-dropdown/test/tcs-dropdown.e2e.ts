import { newE2EPage } from '@stencil/core/testing';

describe('tcs-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-dropdown></tcs-dropdown>');

    const element = await page.find('tcs-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
