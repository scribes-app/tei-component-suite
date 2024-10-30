import { newE2EPage } from '@stencil/core/testing';

describe('tcs-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-select></tcs-select>');

    const element = await page.find('tcs-select');
    expect(element).toHaveClass('hydrated');
  });
});
