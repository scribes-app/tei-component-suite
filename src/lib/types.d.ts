import * as Quill from 'quill';

/**
 * @todo: This union could be generated automatically by the icons command
 */
export type UnionIcons = (
  'arrow-left' |
  'arrow-right'
)

/**
 * @todo: Define the toolbar configuration
 */
export type ToolbarConfig = {
  controls: {
    viewRaw?: boolean;
  }
}

/**
 * @description Quill doesnt export it global types, so we need to define it here as a workaround
 */
export type QuillInstance = Quill.default;
