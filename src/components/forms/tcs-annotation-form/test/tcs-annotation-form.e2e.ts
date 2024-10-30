import { newE2EPage } from '@stencil/core/testing';

describe('tcs-annotation-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-annotation-form></tcs-annotation-form>');

    const element = await page.find('tcs-annotation-form');
    expect(element).toHaveClass('hydrated');
  });
});
