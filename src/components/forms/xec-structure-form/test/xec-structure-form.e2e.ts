import { newE2EPage } from '@stencil/core/testing';

describe('xec-structure-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-structure-form></xec-structure-form>');

    const element = await page.find('xec-structure-form');
    expect(element).toHaveClass('hydrated');
  });
});
