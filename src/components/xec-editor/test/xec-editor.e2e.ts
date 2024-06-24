import { newE2EPage } from '@stencil/core/testing';

describe('xec-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xec-editor></xec-editor>');

    const element = await page.find('xec-editor');
    expect(element).toHaveClass('hydrated');
  });
});
