import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'xml-editor-cmp',
  plugins: [
    sass()
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
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
