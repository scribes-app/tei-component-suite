import * as Quill from 'quill';

/**
 * @todo: This union could be generated automatically by the icons command
 * @see: https://www.flaticon.com for choosing icons and downloading them as svg (use the fi-rr- prefixed icons to keep consistency)
 */
export type UnionIcons = (
  'message-code' |
  'code-simple' |
  'align-left' |
  'align-right' |
  'text-size' |
  'cross' |
  'angle-down' |
  'paragraph-rtl' |
  'paragraph-ltr' |
  'white-space' |
  'broom' |
  'columns' |
  'settings' |
  'lock' |
  'unlock'|
  'arrows-h'|
  'brightness'|
  'contrast'|
  'zoom-in'|
  'zoom-out'|
  'undo'|
  'expand'|
  'compress'
)

export type UnionEditorType = (
  'transcribe' |
  'translate' |
  'comment_verse' |
  'comment_line'
)

export type UnionCommentType = (
  'verse' |
  'line'
)

export type UnionEditorLayoutType = (
  'tabs' |
  'columns'
)

export type UnionVisualizerLayoutType = (
  'rows' |
  'columns'|
  'mix'
)

export type UnionUnclearReason = (
  'legible_incomplete'|
  'uncertain'|
  'faded'|
  'background_noise'
);

export type UnionStructureType = (
  'book'|
  'part'|
  'chapter'|
  'verse'|
  'inscriptio'|
  'subscriptio'
);

export type UnionHighlightedRend = (
  'enlarged'|
  'displaced-above'|
  'displaced-below'|
  'supralinear'|
  'infralinear'|
  'doted'|
  'bigger'
);

export type UnionDeletedRend = (
  'erased'|
  'strikethrough'|
  'dotted'|
  'underline'|
  'other'
);

export type UnionAbbreviationType = (
  'nomSac'|
  'other'
);

export type UnionBlankSpaceUnit = (
  'char'|
  'cm'
)

export type UnionReconstructionReason = (
  'lacuna'|
  'illegible'|
  'unspecified'
);

export type UnionAnnotationType = (
  'top_margin'|
  'bottom_margin'|
  'right_margin'|
  'left_margin'|
  'interlinear'|
  'infra-linear'|
  'supralinear'|
  'ketiv_qere'
);

export type UnionAnnotationRend = (
  'oblique'|
  'vertical'|
  'align_left'|
  'align_center'|
  'align_right'
);

export type UnionAnnotationHand = (
  'main_scribe'|
  'scribe_a'|
  'scribe_b'|
  'scribe_c'|
  'scribe_d'
);

export type BlankSpaceAttributes = {
  unit: UnionBlankSpaceUnit;
  value: number;
}

export type StructureAttributes = {
  type: UnionStructureType;
  n: string;
}

export type AnnotationAttributes = {
  type: UnionAnnotationType;
  rend: UnionAnnotationRend;
  hand: UnionAnnotationHand;
}

export type EditorState = {
  viewType: 'default'|'raw';
  textDirection: 'LTR'|'RTL';
  clean: boolean;
}

export type DropdownConfig = {
  label: string;
  items: DropdownItem[]
}

export type DropdownItem = {
  id: string;
  label: string;
  onClick?: () => any;
  items?: DropdownItem[];
}

export type VisualizerToolbarConfig = {
  controls: {
    layout?: boolean;
  }
}

export type EditorToolbarConfig = {
  controls: {
    settings?: boolean;
    reconstruction?: boolean;
    annotation?: boolean;
    layout?: boolean;
    remove?: boolean;
    structure?: boolean;
    blankSpace?: boolean;
    punctuation?: boolean;
    abbreviation?: boolean;
    deleted?: boolean;
    highlighted?: boolean;
    unclear?: boolean;
    viewRaw?: boolean;
    textDirection?: boolean;
    textSize?: boolean;
  }
}

export type EditorSettings = {
  manuscript?: {
    column?: string;
    folio?: string;
    book?: string;
  }
}

export type EditorFormattedTEI = {
  transcribe?: string;
  translate?: string;
  comment_line?: string;
  comment_verse?: string;
}

/**
 * @description Quill doesnt export it global types, so we need to define it here as a workaround
 */
export type QuillInstance = Quill.default;

export type TcsSelectEntry = {
  label: string;
  id: string|number;
  normalized?: string;
};

export type TcsBlankSpaceFormValues = {
  unit: UnionBlankSpaceUnit;
  value: number;
};

export type TcsStructureFormValues = {
  type: UnionStructureType|'anonymous-block';
  ref: string;
};

export type TcsSettingsFormValues = {
  column?: string;
  folio?: string;
  book?: string;
};

export type TcsAnnotationFormValues = {
  type?: UnionAnnotationType;
  rend?: UnionAnnotationRend;
  hand?: UnionAnnotationHand;
};

export type Attribute = { key: string, value: string }
;
