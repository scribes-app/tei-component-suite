import { newE2EPage } from '@stencil/core/testing';

describe('tcs-textfield', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-textfield></tcs-textfield>');

    const element = await page.find('tcs-textfield');
    expect(element).toHaveClass('hydrated');
  });
});
