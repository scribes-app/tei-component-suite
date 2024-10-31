import { newE2EPage } from '@stencil/core/testing';

describe('tcs-visualizer-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-visualizer-toolbar></tcs-visualizer-toolbar>');

    const element = await page.find('tcs-visualizer-toolbar');
    expect(element).toHaveClass('hydrated');
  });
});
