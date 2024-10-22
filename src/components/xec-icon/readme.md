# xec-icon



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type                                                                                                                                                                                                                            | Default     |
| --------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `icon`    | `icon`     |             | `"align-left" \| "align-right" \| "angle-down" \| "broom" \| "code-simple" \| "columns" \| "cross" \| "lock" \| "message-code" \| "paragraph-ltr" \| "paragraph-rtl" \| "settings" \| "text-size" \| "unlock" \| "white-space"` | `undefined` |
| `library` | `library`  |             | `string`                                                                                                                                                                                                                        | `undefined` |
| `viewBox` | `view-box` |             | `string`                                                                                                                                                                                                                        | `undefined` |


## Events

| Event       | Description | Type                      |
| ----------- | ----------- | ------------------------- |
| `clickIcon` |             | `CustomEvent<SVGElement>` |


## Dependencies

### Used by

 - [xec-button](../xec-button)
 - [xec-select](../xec-select)
 - [xec-toolbar](../xec-toolbar)

### Graph
```mermaid
graph TD;
  xec-button --> xec-icon
  xec-select --> xec-icon
  xec-toolbar --> xec-icon
  style xec-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
