# tcs-settings-form



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description | Type                                                  | Default     |
| --------------- | --------- | ----------- | ----------------------------------------------------- | ----------- |
| `defaultValues` | --        |             | `{ column?: string; folio?: string; book?: string; }` | `undefined` |


## Events

| Event        | Description | Type                                                               |
| ------------ | ----------- | ------------------------------------------------------------------ |
| `formChange` |             | `CustomEvent<{ column?: string; folio?: string; book?: string; }>` |
| `formSubmit` |             | `CustomEvent<{ column?: string; folio?: string; book?: string; }>` |


## Methods

### `isValid() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [tcs-editor](../../tcs-editor)

### Depends on

- [tcs-textfield](../../tcs-textfield)
- [tcs-button](../../tcs-button)

### Graph
```mermaid
graph TD;
  tcs-settings-form --> tcs-textfield
  tcs-settings-form --> tcs-button
  tcs-button --> tcs-icon
  tcs-editor --> tcs-settings-form
  style tcs-settings-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
