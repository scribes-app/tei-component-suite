import Quill from 'quill';
import { BlockBlot } from './blots/BlockBlot';
import { UnclearBlot } from './blots/UnclearBlot';

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
    UnclearBlot
  ].forEach(blot => Quill.register(blot, blot instanceof BlockBlot));
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
