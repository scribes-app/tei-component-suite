# tcs-annotation-form



<!-- Auto Generated Below -->


## Events

| Event        | Description | Type                                                                                                   |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| `formChange` |             | `CustomEvent<{ type?: UnionAnnotationType; rend?: UnionAnnotationRend; hand?: UnionAnnotationHand; }>` |
| `formSubmit` |             | `CustomEvent<{ type?: UnionAnnotationType; rend?: UnionAnnotationRend; hand?: UnionAnnotationHand; }>` |


## Methods

### `isValid() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [tcs-editor](../../tcs-editor)

### Depends on

- [tcs-select](../../tcs-select)
- [tcs-button](../../tcs-button)

### Graph
```mermaid
graph TD;
  tcs-annotation-form --> tcs-select
  tcs-annotation-form --> tcs-button
  tcs-select --> tcs-icon
  tcs-button --> tcs-icon
  tcs-editor --> tcs-annotation-form
  style tcs-annotation-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
