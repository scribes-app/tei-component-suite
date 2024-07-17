import { newE2EPage } from '@stencil/core/testing';

describe('xec-annotation-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-annotation-form></xec-annotation-form>');

    const element = await page.find('xec-annotation-form');
    expect(element).toHaveClass('hydrated');
  });
});
