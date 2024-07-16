# xec-blank-space-form



<!-- Auto Generated Below -->


## Events

| Event        | Description | Type                                                         |
| ------------ | ----------- | ------------------------------------------------------------ |
| `formChange` |             | `CustomEvent<{ unit: UnionBlankSpaceUnit; value: number; }>` |
| `formSubmit` |             | `CustomEvent<{ unit: UnionBlankSpaceUnit; value: number; }>` |


## Methods

### `isValid() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [xec-editor](../../xec-editor)

### Depends on

- [xec-select](../../xec-select)
- [xec-textfield](../../xec-textfield)
- [xec-button](../../xec-button)

### Graph
```mermaid
graph TD;
  xec-blank-space-form --> xec-select
  xec-blank-space-form --> xec-textfield
  xec-blank-space-form --> xec-button
  xec-select --> xec-icon
  xec-button --> xec-icon
  xec-editor --> xec-blank-space-form
  style xec-blank-space-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
