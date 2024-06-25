# xec-editor



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                    | Default                |
| -------- | --------- | ----------- | --------------------------------------- | ---------------------- |
| `config` | --        |             | `{ controls: { viewRaw?: boolean; }; }` | `defaultToolbarConfig` |


## Methods

### `getQuillInstance() => Promise<QuillInstance>`



#### Returns

Type: `Promise<Quill>`




## Dependencies

### Depends on

- [xec-toolbar](../xec-toolbar)

### Graph
```mermaid
graph TD;
  xec-editor --> xec-toolbar
  xec-toolbar --> xec-button
  xec-button --> xec-icon
  style xec-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
