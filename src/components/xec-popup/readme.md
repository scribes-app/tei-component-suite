# xec-popup



<!-- Auto Generated Below -->


## Methods

### `closePopup() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openPopup() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setContent(content: string) => Promise<void>`



#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `content` | `string` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [xec-editor](../xec-editor)

### Depends on

- [xec-button](../xec-button)

### Graph
```mermaid
graph TD;
  xec-popup --> xec-button
  xec-button --> xec-icon
  xec-editor --> xec-popup
  style xec-popup fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
