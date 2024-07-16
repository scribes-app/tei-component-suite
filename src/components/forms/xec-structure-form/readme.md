# xec-structure-form



<!-- Auto Generated Below -->


## Events

| Event        | Description | Type                                                                           |
| ------------ | ----------- | ------------------------------------------------------------------------------ |
| `formChange` |             | `CustomEvent<{ type: UnionStructureType \| "anonymous-block"; ref: string; }>` |
| `formSubmit` |             | `CustomEvent<{ type: UnionStructureType \| "anonymous-block"; ref: string; }>` |


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
  xec-structure-form --> xec-select
  xec-structure-form --> xec-textfield
  xec-structure-form --> xec-button
  xec-select --> xec-icon
  xec-button --> xec-icon
  xec-editor --> xec-structure-form
  style xec-structure-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
