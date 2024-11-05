import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { resolve } from 'path';

export const config: Config = {
  namespace: 'tei-component-suite',
  globalStyle: 'src/global.scss',
  plugins: [
    sass({
      includePaths: [
        resolve(__dirname, 'node_modules'),
        resolve(__dirname, 'src')
      ]
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    angularOutputTarget({
      componentCorePackage: '@metztheolab/tei-component-suite',
      outputType: 'component',
      directivesProxyFile: 'dist/ng/components.ts',
      directivesArrayFile: 'dist/ng/index.ts',
    }),
    reactOutputTarget({
      outDir: 'dist/react',
      customElementsDir: 'components',
      esModules: true,
    }),
    vueOutputTarget({
      componentCorePackage: '@metztheolab/tei-component-suite',
      proxiesFile: 'dist/vue/components.ts',
      loaderDir: '/'
    }),
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'symbols.svg' },
        { src: 'assets' },
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
