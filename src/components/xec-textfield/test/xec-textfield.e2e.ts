import { newE2EPage } from '@stencil/core/testing';

describe('xec-textfield', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-textfield></xec-textfield>');

    const element = await page.find('xec-textfield');
    expect(element).toHaveClass('hydrated');
  });
});
