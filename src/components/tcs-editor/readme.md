# tcs-editor



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description | Type                                                                                                                                                                                                                                                                                                                                                | Default                 |
| --------------- | --------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `settings`      | --        |             | `{ manuscript?: { column?: string; folio?: string; book?: string; }; }`                                                                                                                                                                                                                                                                             | `defaultEditorSettings` |
| `toolbarConfig` | --        |             | `{ controls: { settings?: boolean; reconstruction?: boolean; annotation?: boolean; layout?: boolean; remove?: boolean; structure?: boolean; blankSpace?: boolean; punctuation?: boolean; abbreviation?: boolean; deleted?: boolean; highlighted?: boolean; unclear?: boolean; viewRaw?: boolean; textDirection?: boolean; textSize?: boolean; }; }` | `defaultToolbarConfig`  |


## Methods

### `getFormattedTEI() => Promise<EditorFormattedTEI>`



#### Returns

Type: `Promise<EditorFormattedTEI>`



### `getQuillInstances() => Promise<Map<UnionEditorType, QuillInstance>>`



#### Returns

Type: `Promise<Map<UnionEditorType, Quill>>`



### `getSettings() => Promise<EditorSettings>`



#### Returns

Type: `Promise<EditorSettings>`



### `lock() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFormattedTEI(tei: EditorFormattedTEI) => Promise<void>`



#### Parameters

| Name  | Type                                                                                          | Description |
| ----- | --------------------------------------------------------------------------------------------- | ----------- |
| `tei` | `{ transcribe?: string; translate?: string; comment_line?: string; comment_verse?: string; }` |             |

#### Returns

Type: `Promise<void>`



### `unlock() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [tcs-blank-space-form](../forms/tcs-blank-space-form)
- [tcs-structure-form](../forms/tcs-structure-form)
- [tcs-settings-form](../forms/tcs-settings-form)
- [tcs-annotation-form](../forms/tcs-annotation-form)
- [tcs-toolbar](../tcs-toolbar)
- [tcs-dropdown](../tcs-dropdown)
- [tcs-popup](../tcs-popup)

### Graph
```mermaid
graph TD;
  tcs-editor --> tcs-blank-space-form
  tcs-editor --> tcs-structure-form
  tcs-editor --> tcs-settings-form
  tcs-editor --> tcs-annotation-form
  tcs-editor --> tcs-toolbar
  tcs-editor --> tcs-dropdown
  tcs-editor --> tcs-popup
  tcs-blank-space-form --> tcs-select
  tcs-blank-space-form --> tcs-textfield
  tcs-blank-space-form --> tcs-button
  tcs-select --> tcs-icon
  tcs-button --> tcs-icon
  tcs-structure-form --> tcs-select
  tcs-structure-form --> tcs-textfield
  tcs-structure-form --> tcs-button
  tcs-settings-form --> tcs-textfield
  tcs-settings-form --> tcs-button
  tcs-annotation-form --> tcs-select
  tcs-annotation-form --> tcs-button
  tcs-toolbar --> tcs-button
  tcs-toolbar --> tcs-dropdown
  tcs-toolbar --> tcs-icon
  tcs-dropdown --> tcs-button
  tcs-popup --> tcs-button
  style tcs-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
