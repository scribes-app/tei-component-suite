# tcs-toolbar



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                                                                                                                                                                                                                                                                                                                                                                    | Default     |
| --------------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `config`        | --               |             | `{ controls: { settings?: boolean; reconstruction?: boolean; annotation?: boolean; layout?: boolean; remove?: boolean; structure?: boolean; blankSpace?: boolean; punctuation?: boolean; abbreviation?: boolean; deleted?: boolean; highlighted?: boolean; unclear?: boolean; viewRaw?: boolean; textDirection?: boolean; textSize?: boolean; viewer?: boolean; expand?: boolean; }; }` | `undefined` |
| `disabled`      | `disabled`       |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                               | `false`     |
| `layoutType`    | `layout-type`    |             | `"columns" \| "tabs"`                                                                                                                                                                                                                                                                                                                                                                   | `'columns'` |
| `locked`        | `locked`         |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                               | `false`     |
| `textDirection` | `text-direction` |             | `"LTR" \| "RTL"`                                                                                                                                                                                                                                                                                                                                                                        | `'LTR'`     |
| `viewRaw`       | `view-raw`       |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                               | `false`     |


## Events

| Event                 | Description | Type                                                                                                                         |
| --------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `clickAbbreviation`   |             | `CustomEvent<"nomSac" \| "other">`                                                                                           |
| `clickAnnotation`     |             | `CustomEvent<void>`                                                                                                          |
| `clickBlankSpace`     |             | `CustomEvent<void>`                                                                                                          |
| `clickDeleted`        |             | `CustomEvent<"dotted" \| "erased" \| "other" \| "strikethrough" \| "underline">`                                             |
| `clickExpand`         |             | `CustomEvent<void>`                                                                                                          |
| `clickHighlighted`    |             | `CustomEvent<"bigger" \| "displaced-above" \| "displaced-below" \| "doted" \| "enlarged" \| "infralinear" \| "supralinear">` |
| `clickLayout`         |             | `CustomEvent<void>`                                                                                                          |
| `clickLTR`            |             | `CustomEvent<void>`                                                                                                          |
| `clickPunctuation`    |             | `CustomEvent<string>`                                                                                                        |
| `clickReconstruction` |             | `CustomEvent<"illegible" \| "lacuna" \| "unspecified">`                                                                      |
| `clickRemove`         |             | `CustomEvent<void>`                                                                                                          |
| `clickRTL`            |             | `CustomEvent<void>`                                                                                                          |
| `clickSettings`       |             | `CustomEvent<void>`                                                                                                          |
| `clickStructure`      |             | `CustomEvent<"anonymous-block" \| "book" \| "chapter" \| "inscriptio" \| "part" \| "subscriptio" \| "verse">`                |
| `clickTextSize`       |             | `CustomEvent<void>`                                                                                                          |
| `clickUnclear`        |             | `CustomEvent<"background_noise" \| "faded" \| "legible_incomplete" \| "uncertain">`                                          |
| `clickViewer`         |             | `CustomEvent<void>`                                                                                                          |
| `clickViewRaw`        |             | `CustomEvent<void>`                                                                                                          |


## Dependencies

### Used by

 - [tcs-editor](../tcs-editor)

### Depends on

- [tcs-button](../tcs-button)
- [tcs-dropdown](../tcs-dropdown)
- [tcs-icon](../tcs-icon)

### Graph
```mermaid
graph TD;
  tcs-editor-toolbar --> tcs-button
  tcs-editor-toolbar --> tcs-dropdown
  tcs-editor-toolbar --> tcs-icon
  tcs-button --> tcs-icon
  tcs-dropdown --> tcs-button
  tcs-editor --> tcs-editor-toolbar
  style tcs-editor-toolbar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
