import Quill from 'quill';
import { BlockBlot } from './blots/BlockBlot';
import { HighlightedBlot } from './blots/HighlightedBlot';
import { UnclearBlot } from './blots/UnclearBlot';
import { DeletedBlot } from './blots/DeletedBlot';
import { AbbreviationBlot } from './blots/AbbreviationBlot';
import { BlankSpaceBlot } from './blots/BlankSpaceBlot';
import { AnonymousBlockBlot } from './blots/AnonymousBlockBlot';
import { StructureBlot } from './blots/StructureBlot';

/**
 * Check if two objects are equal (this is the fastest way with JSON.stringify do not use lodash anymore)
 */
export const isEqual = (base: any, comp: any) => {
  return JSON.stringify(base) === JSON.stringify(comp);
}
/**
 * Register all existing blots
 */
export const registerBlots = () => {
  [
    BlockBlot,
    UnclearBlot,
    HighlightedBlot,
    DeletedBlot,
    AbbreviationBlot,
    BlankSpaceBlot,
    AnonymousBlockBlot,
    StructureBlot
  ].forEach(blot => Quill.register(blot, true));
}

/**
 * Wait for a certain amount of time
 */
export const tick = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Delay the execution of a function without blocking the main thread
 * This is similar with setTimeout but it is async
 */
export const delayed = async (fn: Function, ms: number) => {
  await tick(ms);
  fn();
}

/**
 * Add a listener to know whenever an element is clicked outside
 */
export const onClickOutside = (element: HTMLElement, callback: Function, trigger?: HTMLElement): ((this: Window, ev: MouseEvent) => any) => {
  let _listener = (e: MouseEvent) => {
    const eventPaths: HTMLElement[] = (e.composedPath() as HTMLElement[]).filter(n => n.isSameNode);
    const isTriggerElement = trigger && eventPaths.some(n => n.isSameNode(trigger));
    if (isTriggerElement) return;
    const isCurrentElement = eventPaths.some(n => n.isSameNode(element));
    const isElementChild = eventPaths.some(n => element.contains(n));
    if (!isCurrentElement && !isElementChild) callback();
  }
  globalThis.addEventListener('click', _listener);
  return _listener;
}

/**
 * Add a listener to know whenever an element is clicked outside
 */
export const removeClickOutside = (listener: (this: Window, ev: MouseEvent) => any) => {
  globalThis.removeEventListener('click', listener);
}

export enum TagName {
  BLOCK = 'LINE',
  STRUCTURE = 'DIV',
  ANONYMOUS_BLOCK = 'AB',
  HIGHLIGHTED = 'HIGHLIGHT',
  UNCLEAR = 'UNCLEAR',
  ABBREVIATION = 'ABBR',
  DELETED = 'DEL',
  BLANK_SPACE = 'SPACE',
  WORD = 'W',
  WORD_WRAP = 'WORDWRAP',
  TEXT = '#text',
  UNKNOWN = 'UNKNOWN',
  LINE_BREAK = 'LB'
}

export const XMLAvailableTagsList: (TagName|string)[] =  [
  TagName.STRUCTURE,
  TagName.ANONYMOUS_BLOCK,
  TagName.HIGHLIGHTED,
  TagName.UNCLEAR,
  TagName.ABBREVIATION,
  TagName.DELETED,
  TagName.BLANK_SPACE,
  TagName.TEXT,
  TagName.WORD,
  TagName.LINE_BREAK,
]
