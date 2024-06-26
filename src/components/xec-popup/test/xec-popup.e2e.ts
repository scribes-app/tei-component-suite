import { newE2EPage } from '@stencil/core/testing';

describe('xec-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-popup></xec-popup>');

    const element = await page.find('xec-popup');
    expect(element).toHaveClass('hydrated');
  });
});
