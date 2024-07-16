# XML TEI Editor for Scribes app

## Description

This project is a web component library that provide a main component `XecEditor` to edit XML TEI files. It is designed to be used in the [Scribes app](https://github.com/scribes-app).

## Usage

### NPM Package

[https://www.npmjs.com/package/@metztheolab/xml-editor-library]()

### Installation

```bash
npm install @metztheolab/xml-editor-library
```

**Without framework**

In the head of your HTML file, include the following:

```html
<head>
  <script type="module">
    import { defineCustomElements } from '[package-url-or-cdn]/loader/index.es2017.mjs';
    defineCustomElements();
  </script>
  <script>
    globalThis.XecConfig = {
      // This is used to set the path to the symbols.svg file which contains the icons used in the editor.
      symbolsPath: '[url]/symbols.svg',
    }
  </script>
</head>
```

Use components in your HTML file:

```html
<body>
  <xec-editor></xec-editor>
</body>
```

**React**

Create a setup.sh file in the root of your project, this will copy the necessary files to the location of your choice:

```bash
#!/bin/bash

set -e

# Removes the existing react-xec-editor folder
rm -rf src/lib/react-xec-editor
# Copies the necessary files to the src/lib/react-xec-editor folder
cp -r node_modules/@metztheolab/xml-editor-library/dist/react src/lib/react-xec-editor
# Copies the symbols.svg file to the public/assets folder
cp node_modules/@metztheolab/xml-editor-library/dist/collection/symbols.svg public/assets/symbols.svg
```

In the package.json file, add postinstall script:

```json
// ...
  "scripts": {
    // ...
    "postinstall": "./setup.sh"
  }
// ...
```

Re-run the installation to trigger the postinstall script:

```bash
npm install
```

Define the symbols path in your React app (wherever you want, in app.tsx for example):

```js
// ...
globalThis.XecConfig = {
  symbolsPath: '/assets/symbols.svg',
}
```

Use components in your React app:

```tsx
import React from 'react';
import './App.css';
import { XecEditor } from './lib/reac-xec-editor';

function App() {
  return (
    <div className="App">
      <XecEditor />
    </div>
  );
}

export default App;
```

**Angular**

Create a setup.sh file in the root of your project, this will copy the necessary files to the location of your choice:

```bash
#!/bin/bash

set -e

# Removes the existing ng-xec-editor folder
rm -rf src/lib/ng-xec-editor
# Copies the necessary files to the src/lib/ng-xec-editor folder
cp -r node_modules/@metztheolab/xml-editor-library/dist/ng src/lib/ng-xec-editor
# Copies the symbols.svg file to the public/assets folder
cp node_modules/@metztheolab/xml-editor-library/dist/collection/symbols.svg public/assets/symbols.svg
```

In the package.json file, add postinstall script:

```json
// ...
  "scripts": {
    // ...
    "postinstall": "./setup.sh"
  }
// ...
```

Re-run the installation to trigger the postinstall script:

```bash
npm install
```

Import the components (built as directives) in your app.module.ts:

```ts
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DIRECTIVES as XecWebComponents } from '../lib/ng-xec-editor';
import { defineCustomElements } from '@metztheolab/xml-editor-library/loader';

@NgModule({
  declarations: [
    AppComponent,
    ...XecWebComponents
  ],
  exports: [
    ...XecWebComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Define the symbols path in your Angular app (wherever you want, in main.ts for example):

```ts
// ...
globalThis.XecConfig = {
  symbolsPath: '/assets/symbols.svg',
}
```

Use components in your Angular template files:

```html
<!-- ... -->
<xec-editor></xec-editor>
```

### Main component usage

```html
<body>
  <!-- You can use attributes such as toolbarConfig or settings, see the appropriate readme for more information -->
  <xec-editor id="editor"></xec-editor>
  <script>
    const editor = document.querySelector('#editor');
    // Get the current formatted TEI content
    // {transcribe: '{XML TEI string}', translate: '{XML TEI string}', comment_line: '{XML TEI string}', comment_verse: '{XML TEI string}'}
    editor.getFormattedTEI();

    // Set the TEI content
    editor.setFormattedTEI({
      transcribe: '{XML TEI string}'
      translate: '{XML TEI string}'
      comment_line: '{XML TEI string}'
      comment_verse: '{XML TEI string}'
    });

    // Lock the editor
    editor.lock();

    // Unlock the editor
    editor.unlock();
  </script>
</body>
```

## Develop

This project rely on the following tools:

- Docker [https://www.docker.com/]()
- Docker Compose [https://docs.docker.com/compose/]()
- Stencil [https://stenciljs.com/]()
- Quill [https://quilljs.com/]()
- Make [https://www.gnu.org/software/make/]()

### Quick start

- Copy `.docker/.env.example` to `.docker/.env` and adjust the values to your needs
- Run `make up` (once installed you can use `make start` to start the docker compose)
- Run `make install` to install the dependencies
- Run `make dev` to start the development

### Useful commands

| Command | Description |
| --- | --- |
| `make up` | Start the docker compose services |
| `make down` | Stop the docker compose services |
| `make start` | Start the docker compose services |
| `make stop` | Stop the docker compose services |
| `make install` | Install the dependencies |
| `make dev` | Start the development |
| `make build` | Build the project |
| `make stencil` | Use stencil CLI |
| `make logs` | Show the logs |
| `make npm` | Run npm commands |
| `make shell` | Open a shell in the container |
