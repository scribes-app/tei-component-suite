import { newE2EPage } from '@stencil/core/testing';

describe('xec-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-dropdown></xec-dropdown>');

    const element = await page.find('xec-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
