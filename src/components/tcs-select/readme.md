# tcs-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type               | Default     |
| ------------- | ------------- | ----------- | ------------------ | ----------- |
| `entries`     | --            |             | `TcsSelectEntry[]` | `[]`        |
| `inputId`     | `input-id`    |             | `string`           | `undefined` |
| `inputName`   | `input-name`  |             | `string`           | `undefined` |
| `placeholder` | `placeholder` |             | `string`           | `undefined` |
| `required`    | `required`    |             | `boolean`          | `undefined` |


## Events

| Event          | Description | Type                                                                         |
| -------------- | ----------- | ---------------------------------------------------------------------------- |
| `selectChange` |             | `CustomEvent<{ label: string; id: string \| number; normalized?: string; }>` |


## Methods

### `getValue() => Promise<string | number>`



#### Returns

Type: `Promise<string | number>`



### `isValid() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `setValue(value: string) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `value` | `string` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [tcs-annotation-form](../forms/tcs-annotation-form)
 - [tcs-blank-space-form](../forms/tcs-blank-space-form)
 - [tcs-structure-form](../forms/tcs-structure-form)

### Depends on

- [tcs-icon](../tcs-icon)

### Graph
```mermaid
graph TD;
  tcs-select --> tcs-icon
  tcs-annotation-form --> tcs-select
  tcs-blank-space-form --> tcs-select
  tcs-structure-form --> tcs-select
  style tcs-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
