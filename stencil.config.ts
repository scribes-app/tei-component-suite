import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { resolve } from 'path';

export const config: Config = {
  namespace: 'xml-editor-cmp',
  globalStyle: 'src/global.scss',
  plugins: [
    sass({
      includePaths: [
        resolve(__dirname, 'node_modules')
      ]
    })
  ],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'xml-editor-cmp',
      directivesProxyFile: 'dist/ng/components.ts',
      directivesArrayFile: 'dist/ng/index.ts',
    }),
    reactOutputTarget({
      componentCorePackage: 'xml-editor-cmp',
      proxiesFile: 'dist/react/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'symbols.svg', dest: 'symbols.svg' },
      ]
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
