import { newE2EPage } from '@stencil/core/testing';

describe('xec-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-toolbar></xec-toolbar>');

    const element = await page.find('xec-toolbar');
    expect(element).toHaveClass('hydrated');
  });
});
