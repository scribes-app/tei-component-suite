# tcs-textfield



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description | Type                                          | Default     |
| --------------- | --------------- | ----------- | --------------------------------------------- | ----------- |
| `allowedValues` | --              |             | `(string \| number)[]`                        | `undefined` |
| `defaultValue`  | `default-value` |             | `string`                                      | `undefined` |
| `inputId`       | `input-id`      |             | `string`                                      | `undefined` |
| `inputName`     | `input-name`    |             | `string`                                      | `undefined` |
| `integer`       | `integer`       |             | `boolean`                                     | `undefined` |
| `max`           | `max`           |             | `number`                                      | `undefined` |
| `min`           | `min`           |             | `number`                                      | `undefined` |
| `pattern`       | `pattern`       |             | `string`                                      | `undefined` |
| `placeholder`   | `placeholder`   |             | `string`                                      | `undefined` |
| `required`      | `required`      |             | `boolean`                                     | `undefined` |
| `type`          | `type`          |             | `"email" \| "number" \| "password" \| "text"` | `'text'`    |


## Events

| Event             | Description | Type                  |
| ----------------- | ----------- | --------------------- |
| `textfieldChange` |             | `CustomEvent<string>` |


## Methods

### `getValue() => Promise<string>`



#### Returns

Type: `Promise<string>`



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

 - [tcs-blank-space-form](../forms/tcs-blank-space-form)
 - [tcs-settings-form](../forms/tcs-settings-form)
 - [tcs-structure-form](../forms/tcs-structure-form)

### Graph
```mermaid
graph TD;
  tcs-blank-space-form --> tcs-textfield
  tcs-settings-form --> tcs-textfield
  tcs-structure-form --> tcs-textfield
  style tcs-textfield fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
