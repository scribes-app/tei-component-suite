# tcs-visualizer



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description | Type                                   | Default                          |
| --------------- | --------- | ----------- | -------------------------------------- | -------------------------------- |
| `toolbarConfig` | --        |             | `{ controls: { layout?: boolean; }; }` | `defaultVisualizerToolbarConfig` |


## Methods

### `setDocumentViewerImage(source: OpenSeadragon.TileSourceOptions) => Promise<void>`



#### Parameters

| Name     | Type                | Description |
| -------- | ------------------- | ----------- |
| `source` | `TileSourceOptions` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [tcs-button](../tcs-button)
- [tcs-range](../tcs-range)
- [tcs-visualizer-toolbar](../tcs-visualizer-toolbar)
- [tcs-dropdown](../tcs-dropdown)

### Graph
```mermaid
graph TD;
  tcs-visualizer --> tcs-button
  tcs-visualizer --> tcs-range
  tcs-visualizer --> tcs-visualizer-toolbar
  tcs-visualizer --> tcs-dropdown
  tcs-button --> tcs-icon
  tcs-visualizer-toolbar --> tcs-dropdown
  tcs-dropdown --> tcs-button
  style tcs-visualizer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
