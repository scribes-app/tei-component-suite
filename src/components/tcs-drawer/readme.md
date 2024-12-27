# tcs-drawer



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type     | Default     |
| ---------- | ---------- | ----------- | -------- | ----------- |
| `html`     | `html`     |             | `string` | `undefined` |
| `markdown` | `markdown` |             | `string` | `undefined` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [tcs-visualizer](../tcs-visualizer)

### Depends on

- [tcs-button](../tcs-button)

### Graph
```mermaid
graph TD;
  tcs-drawer --> tcs-button
  tcs-button --> tcs-icon
  tcs-visualizer --> tcs-drawer
  style tcs-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
