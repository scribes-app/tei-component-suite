import { Range } from 'quill';
import { QuillInstance } from '../components';
import { BlotName, generateId, TagName } from '../lib/helper';
import { Attribute } from '../lib/types';

export class QuillService {

  /**
   * @description We use a special wrapper fn as a workaround to wrap elements in Quill
   * Since Quill does not support wrapping elements in depth, we need to handle it manually
   */
  static wrap(
    instance: QuillInstance,
    selection: Range,
    tagName: TagName,
    attributes?: Attribute[]) {

      // Depth map
      const depthMap = new Map([
        [TagName.ANONYMOUS_BLOCK, [
          TagName.WORD,
          TagName.SPACE,
          TagName.PUNCTUATION,
          TagName.BLANK_SPACE,
          TagName.ANNOTATION
        ]],
        [TagName.ANNOTATION, [
          TagName.WORD,
          TagName.SPACE,
        ]]
      ]);

      // Find targetted word ids
      const wordIds = instance
        .getContents(selection.index, selection.length)
        .map((op) => op.attributes.word ?? op.attributes.space);

      // Find relative word elements
      let words = Array.from(instance.root.querySelectorAll([TagName.WORD, TagName.SPACE].join(',')))
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

  /**
   * @issue it is not possible to use Quill.format or formatText to properly format words and spaces
   * Multiple tries has been done, when you try to format a letter or a group of letters in a space it result on nothing
   */
  static sanitizeWordsAndSpaces(instance: QuillInstance) {
    // Create spaces and words in separate elements (without it some tags may contain undesired text such as text in space and vise versa)
    instance.root.querySelectorAll([TagName.WORD, TagName.SPACE].join(',')).forEach((el) => {
      const sanitizer = (el: Element) => {
        const insertWord = (refEl: Element, word: string): Element => {
          const element = document.createElement(TagName.WORD);
          element.setAttribute('x', generateId());
          element.textContent = word;
          refEl.after(element);
          return element;
        };
        const insertSpace = (refEl: Element): Element => {
          const element = document.createElement(TagName.SPACE);
          element.setAttribute('x', generateId());
          element.textContent = ' ';
          refEl.after(element);
          return element;
        };
        const characters = el.textContent.split('');
        let word = '';
        let refEl = el;
        for (const char of characters) {
          if (char === ' ') {
            if (word.length > 0) refEl = insertWord(refEl, word);
            word = '';
            refEl = insertSpace(refEl);
          } else {
            word += char;
          }
        }
        if (word.length > 0) refEl = insertWord(refEl, word);
        el.remove();
      }

      switch (el.tagName) {
        case TagName.WORD: {
          const shouldRun = el.textContent.includes(' ');
          if (shouldRun) sanitizer(el);
          break;
        }
        case TagName.SPACE: {
          const shouldRun = el.textContent.match(/[\w\d]/);
          if (shouldRun) sanitizer(el);
          break;
        }
      }
    });

    // Merge words without space between them
    instance.root.querySelectorAll([TagName.WORD, TagName.WORD].join('+')).forEach((el) => {
      const word = el.textContent;
      const prevWord = el.previousElementSibling.textContent;
      el.textContent = `${prevWord}${word}`;
      el.previousElementSibling.remove();
    });

    // Merge spaces without word between them
    instance.root.querySelectorAll([TagName.SPACE, TagName.SPACE].join('+')).forEach((el) => {
      el.previousElementSibling.remove();
    });

    // Only one space per space tag
    instance.root.querySelectorAll(TagName.SPACE).forEach((el) => {
      if (el.textContent.length > 1) el.textContent = ' ';
    });
  }

  static existingText2Words(instance: QuillInstance, range: Range) {
    const characters = instance.getText(range).split('');
    const wordPositions: { index: number; length: number }[] = characters.reduce((acc, char, index) => {
      if (char === ' ') acc.push({ index: index + 1, length: 0 });
      else if (acc.length === 0) acc.push({ index, length: 1 });
      else acc[acc.length - 1].length++;
      return acc;
    }, []);

    wordPositions.forEach(({ index, length }) => {
      instance.formatText(index, length, BlotName.WORD, true, 'silent');
      instance.formatText(index - 1, 1, BlotName.SPACE, true, 'silent');
    });
  }

  static incomingText2Words(instance: QuillInstance, range: Range, text: string) {
    const words = text.split(' ');

    let currentIndex = range.index;
    words.forEach((word, i) => {
      const spaceAtStart = i === 0 ? 0 : 1;
      instance.insertText(currentIndex, word, BlotName.WORD, generateId(), 'silent');
      // This is not possible in Quill, so we need to insert a space blot manually after splitting words...
      // Otherwise Quill merge space in word...
      if (spaceAtStart) instance.insertText(currentIndex, ' ', BlotName.WORD, generateId(), 'silent');
      currentIndex += word.length + spaceAtStart;
    });

    // Replace empty <w> that contains just a space with a <sp>
    instance.root.innerHTML = instance.root.innerHTML.replace(/<w x="([\d\w]+)"> <\/w>/g, '<sp x="$1"> </sp>');

  }

  static insertEmbed(blot: TagName, content: string, attrinutes?: Attribute[]) {
    const node = window.getSelection().anchorNode;
    const offset = window.getSelection().anchorOffset;
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement.closest('w') : (node as HTMLElement).closest('w');
    const atEnd = offset / node.textContent.length > 0.5 ? true : false;

    const embed = document.createElement(blot);
    embed.setAttribute('contenteditable', 'false');
    embed.textContent = content;

    attrinutes?.forEach(({ key, value }) => embed.setAttribute(key, value));
    element[atEnd ? 'after' : 'before'](embed);
  }

}
