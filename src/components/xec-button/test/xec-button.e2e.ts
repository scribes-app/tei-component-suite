import { newE2EPage } from '@stencil/core/testing';

describe('xec-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-button></xec-button>');

    const element = await page.find('xec-button');
    expect(element).toHaveClass('hydrated');
  });
});
