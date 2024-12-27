# tcs-viewer



<!-- Auto Generated Below -->


## Methods

### `setDocumentViewerImage(source: OpenSeadragon.TileSourceOptions) => Promise<void>`



#### Parameters

| Name     | Type                | Description |
| -------- | ------------------- | ----------- |
| `source` | `TileSourceOptions` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [tcs-editor](../tcs-editor)
 - [tcs-visualizer](../tcs-visualizer)

### Depends on

- [tcs-button](../tcs-button)
- [tcs-range](../tcs-range)

### Graph
```mermaid
graph TD;
  tcs-viewer --> tcs-button
  tcs-viewer --> tcs-range
  tcs-button --> tcs-icon
  tcs-editor --> tcs-viewer
  tcs-visualizer --> tcs-viewer
  style tcs-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
