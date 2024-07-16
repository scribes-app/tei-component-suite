# xec-editor



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description | Type                                                                                                                                                                                                                                                                            | Default                 |
| --------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `settings`      | --        |             | `{ manuscript?: { column?: string; folio?: string; book?: string; }; }`                                                                                                                                                                                                         | `defaultEditorSettings` |
| `toolbarConfig` | --        |             | `{ controls: { settings?: boolean; layout?: boolean; remove?: boolean; structure?: boolean; blankSpace?: boolean; punctuation?: boolean; abbreviation?: boolean; deleted?: boolean; highlighted?: boolean; unclear?: boolean; viewRaw?: boolean; textDirection?: boolean; }; }` | `defaultToolbarConfig`  |


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

- [xec-blank-space-form](../forms/xec-blank-space-form)
- [xec-structure-form](../forms/xec-structure-form)
- [xec-settings-form](../forms/xec-settings-form)
- [xec-toolbar](../xec-toolbar)
- [xec-dropdown](../xec-dropdown)
- [xec-popup](../xec-popup)

### Graph
```mermaid
graph TD;
  xec-editor --> xec-blank-space-form
  xec-editor --> xec-structure-form
  xec-editor --> xec-settings-form
  xec-editor --> xec-toolbar
  xec-editor --> xec-dropdown
  xec-editor --> xec-popup
  xec-blank-space-form --> xec-select
  xec-blank-space-form --> xec-textfield
  xec-blank-space-form --> xec-button
  xec-select --> xec-icon
  xec-button --> xec-icon
  xec-structure-form --> xec-select
  xec-structure-form --> xec-textfield
  xec-structure-form --> xec-button
  xec-settings-form --> xec-textfield
  xec-settings-form --> xec-button
  xec-toolbar --> xec-button
  xec-toolbar --> xec-dropdown
  xec-toolbar --> xec-icon
  xec-dropdown --> xec-button
  xec-popup --> xec-button
  style xec-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
