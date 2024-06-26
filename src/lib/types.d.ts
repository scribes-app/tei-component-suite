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
  'cross'
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

export type EditorState = {
  viewType: 'default'|'raw';
  textDirection: 'LTR'|'RTL';
}

/**
 * @todo: Define the toolbar configuration
 */
export type ToolbarConfig = {
  controls: {
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
