import { newE2EPage } from '@stencil/core/testing';

describe('xec-blank-space-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-blank-space-form></xec-blank-space-form>');

    const element = await page.find('xec-blank-space-form');
    expect(element).toHaveClass('hydrated');
  });
});
