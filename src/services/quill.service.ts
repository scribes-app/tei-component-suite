import { Range } from 'quill';
import { generateId, TagName } from '../lib/helper';
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

  static existingText2Word(instance: QuillInstance, range: Range) {
    const characters = instance.getText(range).split('');
    const wordPositions: { index: number; length: number }[] = characters.reduce((acc, char, index) => {
      if (char === ' ') acc.push({ index: index + 1, length: 0 });
      else if (acc.length === 0) acc.push({ index, length: 1 });
      else acc[acc.length - 1].length++;
      return acc;
    }, []);

    wordPositions.forEach(({ index, length }) => {
      instance.formatText(index, length, 'word', true, 'silent');
      instance.formatText(index - 1, 1, 'word', true, 'silent');
    });
  }

  static incomingText2Words(instance: QuillInstance, range: Range, text: string) {
    const words = text.split(' ');

    let currentIndex = range.index;
    words.forEach((word, i) => {
      const spaceAtStart = i === 0 ? 0 : 1;
      instance.insertText(currentIndex, word, 'word', generateId(), 'silent');
      if (spaceAtStart) instance.insertText(currentIndex, ' ', 'word', generateId(), 'silent');
      currentIndex += word.length + spaceAtStart;
    });
  }

  static realSelectedRange(instance: QuillInstance): Range {
    const selection = instance.getSelection();
    if (selection === null) return { index: 0, length: 0 };
    const [start, end] = [selection.index, selection.index + selection.length];
    const [min, max] = [start, end].sort((a, b) => a - b);
    return { index: min, length: max - min };
  }

}
