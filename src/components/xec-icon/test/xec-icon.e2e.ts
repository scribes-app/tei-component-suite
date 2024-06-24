import { newE2EPage } from '@stencil/core/testing';

describe('xec-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-icon></xec-icon>');

    const element = await page.find('xec-icon');
    expect(element).toHaveClass('hydrated');
  });
});
