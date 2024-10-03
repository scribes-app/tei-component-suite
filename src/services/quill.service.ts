import { Range } from 'quill';
import { TagName } from '../lib/helper';
import { QuillInstance } from '../components';

export class QuillService {

  /**
   * @description We use a special wrapper fn as a workaround to wrap elements in Quill
   * Since Quill does not support wrapping elements in depth, we need to handle it manually
   */
  static wrap(
    instance: QuillInstance,
    selection: Range,
    tagName: TagName,
    attributes?: { key: string, value: string }[]) {

      // Depth map
      const depthMap = new Map([
        [TagName.ANONYMOUS_BLOCK, [
          TagName.WORD,
          TagName.PUNCTUATION,
          TagName.BLANK_SPACE,
          TagName.ANNOTATION
        ]],
        [TagName.ANNOTATION, [
          TagName.WORD,
        ]]
      ]);

      // Find targetted word ids
      const wordIds = instance
        .getContents(selection.index, selection.length)
        .map((op) => op.attributes.word);

      // Find relative word elements
      let words = Array.from(instance.root.querySelectorAll(TagName.WORD))
        .filter((word) => wordIds.includes(word.getAttribute('x'))) as HTMLElement[];

      // Restructure injectable elements according to depth map
      const wrappedElements: HTMLElement[] = [];
      const injectableTags = depthMap.get(tagName);

      for (const word of words) {
        if (injectableTags.includes(word.parentElement.tagName.toUpperCase() as TagName)) {
          const parent = word.parentElement;
          if (!wrappedElements.some(el => el.isSameNode(parent))) wrappedElements.push(parent);
        } else {
          wrappedElements.push(word);
        }
      }

      // Handle multiple parents
      const parents = wrappedElements
        .map(el => el.parentElement)
        .filter((parent, index, array) => array.findIndex((p) => p.isSameNode(parent)) === index) as HTMLElement[];

      // Wrap children
      for (const parent of parents) {
        const wrapper = document.createElement(tagName);
        for (const { key, value } of attributes) wrapper.setAttribute(key, value);
        const children = Array.from(parent.children).filter(child => wrappedElements.some(el => el.isSameNode(child)));
        children.forEach(child => {
          const clone = child.cloneNode(true);
          wrapper.appendChild(clone)
        });

        children.at(0).replaceWith(wrapper);
        children.forEach(child => child.remove());
      }
  }

}
