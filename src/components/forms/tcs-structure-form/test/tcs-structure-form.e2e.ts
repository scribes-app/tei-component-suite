import { newE2EPage } from '@stencil/core/testing';

describe('tcs-structure-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-structure-form></tcs-structure-form>');

    const element = await page.find('tcs-structure-form');
    expect(element).toHaveClass('hydrated');
  });
});
