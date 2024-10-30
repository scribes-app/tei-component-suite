import { newE2EPage } from '@stencil/core/testing';

describe('tcs-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-editor></tcs-editor>');

    const element = await page.find('tcs-editor');
    expect(element).toHaveClass('hydrated');
  });
});
