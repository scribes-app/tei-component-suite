# xec-button



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                            | Default     |
| ----------- | ----------- | ----------- | ------------------------------- | ----------- |
| `icon`      | `icon`      |             | `"arrow-left" \| "arrow-right"` | `undefined` |
| `variation` | `variation` |             | `"default"`                     | `'default'` |


## Events

| Event         | Description | Type                          |
| ------------- | ----------- | ----------------------------- |
| `clickButton` |             | `CustomEvent<HTMLDivElement>` |


## Dependencies

### Used by

 - [xec-toolbar](../xec-toolbar)

### Depends on

- [xec-icon](../xec-icon)

### Graph
```mermaid
graph TD;
  xec-button --> xec-icon
  xec-toolbar --> xec-button
  style xec-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
