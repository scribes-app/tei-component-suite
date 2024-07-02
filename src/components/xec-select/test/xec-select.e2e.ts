import { newE2EPage } from '@stencil/core/testing';

describe('xec-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-select></xec-select>');

    const element = await page.find('xec-select');
    expect(element).toHaveClass('hydrated');
  });
});
