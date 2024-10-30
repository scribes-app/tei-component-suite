# tcs-dropdown



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type                                        | Default                                              |
| ---------- | ----------- | ----------- | ------------------------------------------- | ---------------------------------------------------- |
| `config`   | --          |             | `{ label: string; items: DropdownItem[]; }` | `{     label: '__dropdown_label',     items: []   }` |
| `disabled` | `disabled`  |             | `boolean`                                   | `false`                                              |
| `display`  | `display`   |             | `"default" \| "slim"`                       | `'default'`                                          |
| `slimText` | `slim-text` |             | `string`                                    | `undefined`                                          |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [tcs-editor](../tcs-editor)
 - [tcs-toolbar](../tcs-toolbar)

### Depends on

- [tcs-button](../tcs-button)

### Graph
```mermaid
graph TD;
  tcs-dropdown --> tcs-button
  tcs-button --> tcs-icon
  tcs-editor --> tcs-dropdown
  tcs-toolbar --> tcs-dropdown
  style tcs-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
