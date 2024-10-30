# tcs-structure-form



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

 - [tcs-editor](../../tcs-editor)

### Depends on

- [tcs-select](../../tcs-select)
- [tcs-textfield](../../tcs-textfield)
- [tcs-button](../../tcs-button)

### Graph
```mermaid
graph TD;
  tcs-structure-form --> tcs-select
  tcs-structure-form --> tcs-textfield
  tcs-structure-form --> tcs-button
  tcs-select --> tcs-icon
  tcs-button --> tcs-icon
  tcs-editor --> tcs-structure-form
  style tcs-structure-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
