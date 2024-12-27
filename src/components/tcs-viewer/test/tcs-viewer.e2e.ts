import { newE2EPage } from '@stencil/core/testing';

describe('tcs-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-viewer></tcs-viewer>');

    const element = await page.find('tcs-viewer');
    expect(element).toHaveClass('hydrated');
  });
});
