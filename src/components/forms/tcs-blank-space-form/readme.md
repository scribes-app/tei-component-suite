# tcs-blank-space-form



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

 - [tcs-editor](../../tcs-editor)

### Depends on

- [tcs-select](../../tcs-select)
- [tcs-textfield](../../tcs-textfield)
- [tcs-button](../../tcs-button)

### Graph
```mermaid
graph TD;
  tcs-blank-space-form --> tcs-select
  tcs-blank-space-form --> tcs-textfield
  tcs-blank-space-form --> tcs-button
  tcs-select --> tcs-icon
  tcs-button --> tcs-icon
  tcs-editor --> tcs-blank-space-form
  style tcs-blank-space-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
