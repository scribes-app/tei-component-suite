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
  'cross' |
  'angle-down' |
  'white-space'
)

export type UnionEditorType = (
  'transcribe' |
  'translate' |
  'comment'
)


export type UnionUnclearReason = (
  'legible_incomplete'|
  'uncertain'|
  'faded'|
  'background_noise'
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

export type BlankSpaceAttributes = {
  unit: UnionBlankSpaceUnit;
  value: number;
}

export type EditorState = {
  viewType: 'default'|'raw';
  textDirection: 'LTR'|'RTL';
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

export type ToolbarConfig = {
  controls: {
    blankSpace?: boolean;
    abbreviation?: boolean;
    deleted?: boolean;
    highlighted?: boolean;
    unclear?: boolean;
    viewXML?: boolean;
    viewRaw?: boolean;
    textDirection?: boolean;
  }
}

/**
 * @description Quill doesnt export it global types, so we need to define it here as a workaround
 */
export type QuillInstance = Quill.default;

export type XecSelectEntry = {
  label: string;
  id: string|number;
  normalized?: string;
};
