import { newE2EPage } from '@stencil/core/testing';

describe('tcs-visualizer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tcs-visualizer></tcs-visualizer>');

    const element = await page.find('tcs-visualizer');
    expect(element).toHaveClass('hydrated');
  });
});
