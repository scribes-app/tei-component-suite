import { newE2EPage } from '@stencil/core/testing';

describe('tcs-context-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-context-menu></tcs-context-menu>');

    const element = await page.find('tcs-context-menu');
    expect(element).toHaveClass('hydrated');
  });
});
