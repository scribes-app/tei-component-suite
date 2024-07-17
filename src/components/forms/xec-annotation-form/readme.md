# xec-annotation-form



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

 - [xec-editor](../../xec-editor)

### Depends on

- [xec-select](../../xec-select)
- [xec-button](../../xec-button)

### Graph
```mermaid
graph TD;
  xec-annotation-form --> xec-select
  xec-annotation-form --> xec-button
  xec-select --> xec-icon
  xec-button --> xec-icon
  xec-editor --> xec-annotation-form
  style xec-annotation-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
