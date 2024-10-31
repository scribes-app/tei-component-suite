import { Component, Host, h } from '@stencil/core';
import { Element, JSX, Method, Prop, State, Watch } from '@stencil/core/internal';
import classNames from 'classnames';
import Quill from 'quill';
import { Delta, Range } from 'quill/core';
import { TcsBlankSpaceFormCustomEvent } from '../../components';
import { BlotName, Punctuations, TagName, capitalize, delayed, generateId, registerBlots } from '../../lib/helper';
import { EditorFormattedTEI, EditorSettings, EditorState, EditorToolbarConfig, QuillInstance, TcsAnnotationFormValues, TcsBlankSpaceFormValues, TcsSettingsFormValues, TcsStructureFormValues, UnionAbbreviationType, UnionCommentType, UnionDeletedRend, UnionEditorLayoutType, UnionEditorType, UnionHighlightedRend, UnionReconstructionReason, UnionUnclearReason } from '../../lib/types';
import { QuillService } from '../../services/quill.service';
import { XMLTransformerService } from '../../services/xml-transformer.service';
@Component({
  tag: 'tcs-editor',
  styleUrls: [
    'tcs-editor.scss'
  ],
  /**
   * We cannot scope the styles because Quill.js uses classes that do not exist before being rendered
   * The scope will be done using classic CSS selectors
   * Should be removed when Quill.js will be compatible with shadow DOM
   */
  scoped: false,
  /**
   * We disable the shadow DOM because Quill.js does not work with it
   * @see https://github.com/slab/quill/issues/2021
   */
  shadow: false,
})
export class TcsEditor {

  private activeInstance: QuillInstance;
  private activeTextarea: HTMLTextAreaElement;
  private editorInstances: Map<UnionEditorType, QuillInstance> = new Map();
  private editorElements: Map<UnionEditorType, HTMLDivElement> = new Map();
  private textareaElements: Map<UnionEditorType, HTMLTextAreaElement> = new Map();
  private popupElement: HTMLTcsPopupElement;
  private concurrentTextChange: boolean = false;

  @Element()
  private element: HTMLElement;

  @Prop({ mutable: true })
  public toolbarConfig: EditorToolbarConfig = defaultEditorToolbarConfig;

  @Prop({ mutable: true })
  public settings: EditorSettings = defaultEditorSettings;

  @State()
  private editorStates: Map<UnionEditorType, EditorState> = new Map([
    ['transcribe', { viewType: 'default', textDirection: 'LTR', clean: true }],
    ['translate', { viewType: 'default', textDirection: 'LTR', clean: true }],
    ['comment_line', { viewType: 'default', textDirection: 'LTR', clean: true }],
    ['comment_verse', { viewType: 'default', textDirection: 'LTR', clean: true }],
  ]);

  @State()
  private activeEditor: UnionEditorType = 'transcribe';

  @State()
  private activeCommentTab: UnionCommentType = 'line';

  @State()
  private layoutType: UnionEditorLayoutType = 'columns';

  @State()
  private locked: boolean = false;

  @State()
  private textSize: 's'|'m'|'l'|'xl' = 's';

  @Method()
  public async getQuillInstances(): Promise<Map<UnionEditorType, QuillInstance>> {
    return this.editorInstances;
  }

  @Method()
  public async lock(): Promise<void> {
    this.locked = true;
    Array.from(this.textareaElements.values())
      .forEach(textarea => textarea.setAttribute('disabled', ''));
    Array.from(this.editorInstances.values())
      .forEach(instance => instance.disable());
  }

  @Method()
  public async unlock(): Promise<void> {
    this.locked = false;
    Array.from(this.textareaElements.values())
      .forEach(textarea => textarea.removeAttribute('disabled'));
    Array.from(this.editorInstances.values())
      .forEach(instance => instance.enable());
  }

  @Method()
  public async getSettings(): Promise<EditorSettings> {
    return this.settings;
  }

  @Method()
  public async getFormattedTEI(): Promise<EditorFormattedTEI> {
    const tei: EditorFormattedTEI = {};
    const transform = (content: string): string => {
      return XMLTransformerService.XML2TEI(
        XMLTransformerService.editor2XML(
          XMLTransformerService.removeClasses(content)
        )
      , this.settings)
    };
    for (const [editorType, instance] of this.editorInstances.entries()) {
      if (instance.getLength() > 1) tei[editorType] = transform(instance.root.innerHTML);
    }
    return tei;
  }

  @Method()
  public async setFormattedTEI(tei: EditorFormattedTEI): Promise<void> {
    const transform = (content: string): string => {
      return XMLTransformerService.addClasses(
        XMLTransformerService.XML2Editor(
          XMLTransformerService.TEI2XML(content)
        )
      );
    };
    for (const [editorType, instance] of this.editorInstances.entries()) {
      if (tei[editorType]) instance.root.innerHTML = transform(tei[editorType]);
    }

    delayed(() => {
      this.syncLines();
      for (const instance of this.editorInstances.values()) {
        delayed(instance.blur.bind(instance), 50);
      }
    }, 150);
  }

  @Watch('settings')
  public watchSettings(next?: string|object): void {
    if (!next || typeof next === 'object') return;
    this.settings = JSON.parse(next);
  }

  @Watch('toolbarConfig')
  public watchEditorToolbarConfig(next?: string|object): void {
    if (!next || typeof next === 'object') return;
    this.toolbarConfig = JSON.parse(next);
  }

  /**
   * Lifecycle hook called when the component has rendered
   */
  public componentDidLoad(): void {
    this.initQuillInstances();
    this.initTextareaElements();
    this.initTextSize();
  }

  /**
   * Lifecycle hook called before the component is rendered
   */
  public componentWillLoad(): void {
    this.element.getAttribute('settings') ? this.watchSettings(this.element.getAttribute('settings')) : defaultEditorSettings;
    this.element.getAttribute('toolbarConfig') ? this.watchEditorToolbarConfig(this.element.getAttribute('toolbarConfig')) : defaultEditorToolbarConfig;

  }

  /**
   * Initialize the textarea raw editors
   */
  private initTextareaElements(): void {
    for (const [editorType, textareaElement] of Array.from(this.textareaElements.entries())) {
      textareaElement.addEventListener('focus', this.onFocusTextarea.bind(this, editorType));
    }

    this.activeTextarea = this.textareaElements.get(this.activeEditor);
  }

  /**
   * Initialize the Quill editors
   */
  private initQuillInstances(): void {
    registerBlots();

    for (const [editorType, editorElement] of Array.from(this.editorElements.entries())) {
      const instance = new Quill(editorElement);
      instance.root.addEventListener('focus', this.onFocusEditor.bind(this, editorType));
      instance.on('text-change', this.onTextChange.bind(this, editorType));
      instance.clipboard.onPaste = this.onPaste.bind(this, editorType);
      this.editorInstances.set(editorType, instance);
    }

    this.activeInstance = this.editorInstances.get(this.activeEditor);
  }

  /**
   * Initialize the text size
   */
  private initTextSize(): void {
    this.editorInstances.forEach((instance) => {
      instance.container.classList.add(`text-size-${this.textSize}`);
    });
    this.textareaElements.forEach((element) => {
      element.classList.add(`text-size-${this.textSize}`);
    });
  }

  /**
   * Switch active instance according to the current focused textarea
   */
  private onFocusTextarea(editorType: UnionEditorType): void {
    this.activeInstance = this.editorInstances.get(editorType);
    this.activeTextarea = this.textareaElements.get(editorType);
    this.activeEditor = editorType;
  }

  /**
   * Switch active instance according to the current focused editor
   */
  private onFocusEditor(editorType: UnionEditorType): void {
    this.activeInstance = this.editorInstances.get(editorType);
    this.activeTextarea = this.textareaElements.get(editorType);
    this.activeEditor = editorType;
  }

  /**
   * Switch active instance according to the clicked tab
   */
  private onClickTab(editorType: UnionEditorType): void {
    this.activeInstance = this.editorInstances.get(editorType);
    this.activeTextarea = this.textareaElements.get(editorType);
    this.activeEditor = editorType;
  }

  /**
   * Switch between different text size
   */
  private onClickTextSize(): void {
    const sizes: (typeof TcsEditor.prototype.textSize)[] = [
      's', 'm', 'l', 'xl'
    ];
    const currentIndex = sizes.indexOf(this.textSize);
    const nextIndex = currentIndex === sizes.length - 1 ? 0 : currentIndex + 1;
    this.editorInstances.forEach((instance) => {
      instance.container.classList.remove(`text-size-${this.textSize}`);
      instance.container.classList.add(`text-size-${sizes[nextIndex]}`);
    });
    this.textareaElements.forEach((element) => {
      element.classList.remove(`text-size-${this.textSize}`);
      element.classList.add(`text-size-${sizes[nextIndex]}`);
    });
    this.textSize = sizes[nextIndex];
  }

  /**
   * Handle the text change event
   */
  private onPaste(editorType: UnionEditorType, range: Range, content: { text: string, html: string }): void {
    this.concurrentTextChange = true;

    const instance = this.editorInstances.get(editorType);
    instance.deleteText(range);
    QuillService.incomingText2Words(instance, range, content.text);

    // Check structure
    if (editorType === 'transcribe') {
      this.checkTranscribeStructure();
    }

    this.concurrentTextChange = false;
  }

  /**
   * Handle the text change event
   */
  private onTextChange(editorType: UnionEditorType, delta: Delta): void {
    if (this.concurrentTextChange) return;

    const isNewBlock = delta.ops.at(0)?.attributes?.block || delta.ops.at(1)?.attributes?.block;
    const isDelete = delta.ops.at(0)?.delete || delta.ops.at(1)?.delete;
    const isSpace = delta.ops.at(0)?.insert === ' ' || delta.ops.at(1)?.insert === ' ';
    const isCharacter = delta.ops.at(0)?.insert && delta.ops.at(0)?.insert !== ' ' || delta.ops.at(1)?.insert !== ' ';
    const instance = this.editorInstances.get(editorType);
    const range = instance.getSelection();

    // Insert a new block (a line in the editor point of view) or delete it
    if (isNewBlock || isDelete) {
      this.concurrentTextChange = true;

      const instance = this.editorInstances.get(editorType);
      instance.root.innerHTML = XMLTransformerService.addClasses(instance.root.innerHTML);
      const nextPosition = (range?.index ?? 0) + (isNewBlock ? 1 : 0);

      this.syncLines();

      // Merge words while deleting a space
      if (isDelete) {
        const retain = delta.ops.at(0)?.retain as number ?? 0;
        const prevChar = instance.getText(new Range(retain - 1, 1))
        const nextChar = instance.getText(new Range(retain + 1, 1))
        if (prevChar !== ' ' && nextChar !== ' ') {
          const prevSpaceIndex = instance.getText().lastIndexOf(' ', retain);
          const nextSpaceIndex = instance.getText().indexOf(' ', retain);
          const length = nextSpaceIndex - prevSpaceIndex;
          instance.formatText(prevSpaceIndex + 1, length, BlotName.WORD, generateId());
        }
      }

      delayed(() => {
        instance.setSelection({ index: nextPosition, length: 0 });
        this.concurrentTextChange = false;
      }, 15)
    }

    // Wrap words at each space
    if (isSpace && !this.concurrentTextChange) {
      this.concurrentTextChange = true;
      const instance = this.editorInstances.get(editorType);
      instance.formatText(range.index - 1, 1, BlotName.SPACE, generateId());
      this.concurrentTextChange = false;
    }

    // Merge words while typing a character at the end or the beginning of a word
    if (isCharacter && !this.concurrentTextChange) {
      this.concurrentTextChange = true;
      const retain = delta.ops.at(0)?.retain as number ?? 0;
      const prevChar = instance.getText(new Range(retain - 1, 1))
      const nextChar = instance.getText(new Range(retain + 1, 1))
      if (prevChar === ' ' && nextChar !== ' ') {
        let nextSpaceIndex = instance.getText().indexOf(' ', retain);
        // Handle editing from the end of the text
        if (nextSpaceIndex === -1) nextSpaceIndex = instance.getLength();
        const nextWordLength = nextSpaceIndex - retain;
        instance.formatText(retain, nextWordLength, BlotName.WORD, generateId());
      }
      if (nextChar === ' ' && prevChar !== ' ') {
        const prevSpaceIndex = instance.getText().lastIndexOf(' ', retain);
        const prevWordLength = retain - prevSpaceIndex;
        instance.formatText(prevSpaceIndex, prevWordLength + 1, BlotName.WORD, generateId());
      }
      this.concurrentTextChange = false;
    }

    // Check structure
    if (editorType === 'transcribe') {
      this.checkTranscribeStructure();
    }
  }

  private checkTranscribeStructure(): void {
    const instance = this.editorInstances.get('transcribe');
    const clean = Array.from(instance.root.querySelectorAll(TagName.BLOCK))
    .every(block => {
      const hasChild = Boolean(block.children.length);
      if (!hasChild) return false;
      const onlyBreak = block.children.length === 1 && Array.from(block.children).at(0).tagName === TagName.HTML_LINE_BREAK;
      const isStructure = Array.from(block.children).every(e => e.tagName === TagName.STRUCTURE && ['part', 'chapter'].includes(e.getAttribute('type')));
      return onlyBreak || isStructure;
    });

  this.setActiveEditorState('clean', clean);
  }

  /**
   * Sync the lines between the editors
   */
  private syncLines(): void {
    const ln = this.editorInstances.get('transcribe').getLines().length;
    const instances = [
      this.editorInstances.get('translate'),
      this.editorInstances.get('comment_line'),
      this.editorInstances.get('comment_verse')
    ];
    for (const instance of instances) {
      instance.root.querySelectorAll(TagName.BLOCK).forEach((block, index) => {
        if (index >= ln) block.remove();
      });
      for (let i = instance.root.querySelectorAll(TagName.BLOCK).length; i < ln; i++) {
        const block = document.createElement(TagName.BLOCK);
        block.innerHTML = '<br />';
        instance.root.appendChild(block);
      }
    }
  }

  /**
   * Handle the click on the view raw button
   * Toggle the view between raw and default
   */
  private onClickViewRaw(): void {
    const editorState = this.editorStates.get(this.activeEditor);
    this.concurrentTextChange = true;
    if (editorState.viewType === 'raw') {
      const editorContent = XMLTransformerService.XML2Editor(this.activeTextarea.value);
      this.activeInstance.root.innerHTML = XMLTransformerService.addClasses(editorContent);
    } else {
      const xmlContent = XMLTransformerService.editor2XML(this.activeInstance.root.innerHTML);
      this.activeTextarea.value = XMLTransformerService.removeClasses(xmlContent);
    }
    this.concurrentTextChange = false;
    this.setActiveEditorState('viewType', editorState.viewType === 'raw' ? 'default' : 'raw');
  }

  /**
   * Handle the click on the text direction buttons
   */
  private onClickRTL(): void {
    this.activeInstance.root.classList.add('direction-rtl');
    this.activeInstance.focus();
    this.setActiveEditorState('textDirection', 'RTL');
  }

  /**
   * Handle the click on the text direction buttons
   */
  private onClickLTR(): void {
    this.editorStates.get(this.activeEditor).textDirection = 'LTR';
    this.activeInstance.root.classList.remove('direction-rtl');
    this.activeInstance.focus();
    this.setActiveEditorState('textDirection', 'LTR');
  }

  private onClickBlankSpace(): void {
    this.popupElement.setContent(
      <tcs-blank-space-form
        onFormSubmit={this.onSubmitBlankSpaceForm.bind(this)}
      />
    )
    this.popupElement.openPopup();
  }

  private onSubmitBlankSpaceForm(event: TcsBlankSpaceFormCustomEvent<TcsBlankSpaceFormValues>): void {
    this.popupElement.closePopup();
    this.activeInstance.focus();
    this.concurrentTextChange = true;
    QuillService.insertEmbed(TagName.BLANK_SPACE, '_', [
      { key: 'unit', value: event.detail.unit },
      { key: 'value', value: event.detail.value.toString() },
    ]);
    this.concurrentTextChange = false;
  }

  private onClickUnclear(event: CustomEvent<UnionUnclearReason>): void {
    const { detail: reason } = event;
    this.activeInstance.format(BlotName.UNCLEAR, reason);
  }

  private onClickHighlighted(event: CustomEvent<UnionHighlightedRend>): void {
    const { detail: rend } = event;
    this.activeInstance.format(BlotName.HIGHLIGHTED, rend);
  }

  private onClickDeleted(event: CustomEvent<UnionDeletedRend>): void {
    const { detail: rend } = event;
    this.activeInstance.format(BlotName.DELETED, rend);
  }

  private onClickAbbreviation(event: CustomEvent<UnionAbbreviationType>): void {
    const { detail: type } = event;
    this.activeInstance.format(BlotName.ABBREVIATION, type);
  }

  private onClickPunctuation(event: CustomEvent<typeof Punctuations[number]>): void {
    const { detail: type } = event;
    this.activeInstance.focus();
    this.concurrentTextChange = true;
    QuillService.insertEmbed(TagName.PUNCTUATION, type);
    this.concurrentTextChange = false;
  }

  private onClickLayout(): void {
    this.layoutType = this.layoutType === 'columns' ? 'tabs' : 'columns';
  }

  private onClickCommentDropdown(type: UnionCommentType): void {
    this.activeCommentTab = type;
    this.activeInstance = this.editorInstances.get(`comment_${type}` as UnionEditorType);
    this.activeTextarea = this.textareaElements.get(`comment_${type}` as UnionEditorType);
    this.activeEditor = `comment_${type}` as UnionEditorType;
  }

  private onClickRemove(): void {
    // Should has the focus to get proper selection
    this.activeInstance.focus();
    const range = this.activeInstance.getSelection();
    const text = this.activeInstance.getText(range.index, range.length);
    this.concurrentTextChange = true;
    this.activeInstance.deleteText(range);
    this.activeInstance.insertText(range.index, text);
    this.concurrentTextChange = false;
  }

  private onClickStructure(): void {
    this.popupElement.setContent(
      <tcs-structure-form
        onFormSubmit={this.onSubmitStructureForm.bind(this)}
      />
    );
    this.popupElement.openPopup();
  }

  private onSubmitStructureForm(event: CustomEvent<TcsStructureFormValues>): void {
    this.concurrentTextChange = true;
    this.popupElement.closePopup();
    const blot = event.detail.type === BlotName.ANONYMOUS_BLOCK ? BlotName.ANONYMOUS_BLOCK : BlotName.STRUCTURE;
    const params = event.detail.type === BlotName.ANONYMOUS_BLOCK ? event.detail.ref : { type: event.detail.type, n: event.detail.ref };
    this.activeInstance.focus();
    const range = this.activeInstance.getSelection();

    if (event.detail.type === BlotName.ANONYMOUS_BLOCK) {
      QuillService.wrap(
        this.activeInstance,
        range,
        TagName.ANONYMOUS_BLOCK,
        [{ key: 'n', value: event.detail.ref }]
      );
    } else {
      this.activeInstance.format(blot, params);
      QuillService.existingText2Word(this.activeInstance, {
        index: 0,
        length: this.activeInstance.getLength(),
      });
    }

    this.activeInstance.root.innerHTML = XMLTransformerService.addClasses(this.activeInstance.root.innerHTML);

    delayed(() => {
      this.activeInstance.setSelection(range);
      this.checkTranscribeStructure();
      this.concurrentTextChange = false;
    }, 15);
  }

  private onClickSettings(): void {
    this.popupElement.setContent(
      <tcs-settings-form
        defaultValues={this.settings.manuscript}
        onFormSubmit={this.onSubmitSettingsForm.bind(this)}
      />
    );
    this.popupElement.openPopup();
  }

  private onSubmitSettingsForm(event: CustomEvent<TcsSettingsFormValues>): void {
    this.popupElement.closePopup();
    this.settings = {
      ...this.settings,
      manuscript: {
        ...this.settings.manuscript,
        ...event.detail,
      },
    };
  }

  private onClickAnnotation(): void {
    this.popupElement.setContent(
      <tcs-annotation-form
        onFormSubmit={this.onSubmitAnnotationForm.bind(this)}
      />
    );
    this.popupElement.openPopup();
  }

  private onSubmitAnnotationForm(event: CustomEvent<TcsAnnotationFormValues>): void {
    this.popupElement.closePopup();
    this.activeInstance.focus();
    this.concurrentTextChange = true;
    QuillService.wrap(
      this.activeInstance,
      this.activeInstance.getSelection(),
      TagName.ANNOTATION,
      [
        { key: 'type', value: event.detail.type },
        { key: 'rend', value: event.detail.rend },
        { key: 'hand', value: event.detail.hand },
      ]
    );
    this.concurrentTextChange = false;
  }

  private onClickReconstruction(event: CustomEvent<UnionReconstructionReason>): void {
    const { detail: reason } = event;
    this.activeInstance.format(BlotName.RECONSTRUCTION, reason);
  }

  /**
   * Set the active editor state
   * This solve the issue of the state not being updated when using deep properties
   */
  private setActiveEditorState(property: keyof EditorState, value: EditorState[keyof EditorState]): void {
    const editorState = this.editorStates.get(this.activeEditor);
    // @ts-ignore uncomptabile typescript
    editorState[property] = value;
    this.editorStates.set(this.activeEditor, editorState);
    // Force re-render
    this.editorStates = structuredClone(this.editorStates);
  }

  /**
   * Render the component
   */
  public render(): JSX.Element {
    const {
      onClickTab,
      onClickLTR,
      onClickRTL,
      onClickTextSize,
      onClickViewRaw,
      onClickUnclear,
      onClickHighlighted,
      onClickDeleted,
      onClickAbbreviation,
      onClickBlankSpace,
      onClickPunctuation,
      onClickRemove,
      onClickStructure,
      onClickLayout,
      onClickSettings,
      onClickReconstruction,
      onClickAnnotation,
      onClickCommentDropdown,
      toolbarConfig,
      activeEditor,
      editorStates,
      activeCommentTab,
      locked,
      layoutType
    } = this;
    return (
      <Host>
        <tcs-editor-toolbar
          class="toolbar"
          config={toolbarConfig}
          onClickViewRaw={onClickViewRaw.bind(this)}
          onClickRTL={onClickRTL.bind(this)}
          onClickLTR={onClickLTR.bind(this)}
          onClickUnclear={onClickUnclear.bind(this)}
          onClickHighlighted={onClickHighlighted.bind(this)}
          onClickDeleted={onClickDeleted.bind(this)}
          onClickAbbreviation={onClickAbbreviation.bind(this)}
          onClickBlankSpace={onClickBlankSpace.bind(this)}
          onClickPunctuation={onClickPunctuation.bind(this)}
          onClickStructure={onClickStructure.bind(this)}
          onClickLayout={onClickLayout.bind(this)}
          onClickRemove={onClickRemove.bind(this)}
          onClickSettings={onClickSettings.bind(this)}
          onClickReconstruction={onClickReconstruction.bind(this)}
          onClickAnnotation={onClickAnnotation.bind(this)}
          onClickTextSize={onClickTextSize.bind(this)}
          layoutType={layoutType}
          textDirection={editorStates.get(activeEditor).textDirection}
          viewRaw={editorStates.get(activeEditor).viewType === 'raw'}
          locked={locked}
        />
        <div class={classNames({
          editors: true,
          [layoutType]: true,
        })}>
          <div class={classNames({
            editorWrapper: true,
            transcribe: true,
            active: activeEditor === 'transcribe'
          })}>
            <div
              class={classNames({
                editor: true,
                hidden: editorStates.get('transcribe').viewType === 'raw',
              })}
              ref={el => this.editorElements.set('transcribe', el)}
              />
            <textarea
              class={classNames({
                editor: true,
                hidden: editorStates.get('transcribe').viewType === 'default',
                textarea: true,
              })}
              ref={el => this.textareaElements.set('transcribe', el)}
            />
            <div class={classNames({
              note: true,
              hidden: editorStates.get('transcribe').viewType === 'raw',
              warning: !editorStates.get('transcribe').clean,
            })}>
              {!editorStates.get('transcribe').clean && (
                '⚠️ Your document structure is not clean. Please check the structure and correct it (for example chapter is required at root).'
              )}
              {editorStates.get('transcribe').clean && (
                '✅ Your document structure is clean.'
              )}
            </div>
          </div>

          <div class={classNames({
            editorWrapper: true,
            translate: true,
            active: activeEditor === 'translate'
          })}>
            <div
              class={classNames({
                editor: true,
                hidden: editorStates.get('translate').viewType === 'raw',
              })}
              ref={el => this.editorElements.set('translate', el)}
            />
            <textarea
              class={classNames({
                editor: true,
                hidden: editorStates.get('translate').viewType === 'default',
                textarea: true,
              })}
              ref={el => this.textareaElements.set('translate', el)}
            />
          </div>
          <div class={classNames({
            editorWrapper: true,
            comment: true,
            active: activeEditor.includes('comment')
          })}>
            <tcs-dropdown
              disabled={locked}
              config={{
                label: capitalize(activeCommentTab.replace('comment_', '')),
                items: [
                  {
                    id: 'line',
                    label: 'Line',
                    onClick: onClickCommentDropdown.bind(this, 'line')
                  },
                  {
                    id: 'verse',
                    label: 'Verse',
                    onClick: onClickCommentDropdown.bind(this, 'verse')
                  }
                ]
              }}
            />
            <div
              class={classNames({
                editor: true,
                hidden: editorStates.get('comment_line').viewType === 'raw' || activeCommentTab !== 'line',
              })}
              ref={el => this.editorElements.set('comment_line', el)}
            />
            <textarea class={classNames({
                editor: true,
                hidden: editorStates.get('comment_line').viewType === 'default' || activeCommentTab !== 'line',
                textarea: true,
              })}
              ref={el => this.textareaElements.set('comment_line', el)}
            />
            <div
              class={classNames({
                editor: true,
                hidden: editorStates.get('comment_verse').viewType === 'raw' || activeCommentTab !== 'verse',
              })}
              ref={el => this.editorElements.set('comment_verse', el)}
            />
            <textarea class={classNames({
                editor: true,
                hidden: editorStates.get('comment_verse').viewType === 'default' || activeCommentTab !== 'verse',
                textarea: true,
              })}
              ref={el => this.textareaElements.set('comment_verse', el)}
            />
          </div>
          {layoutType === 'tabs' && (
            <div class="tabs">
              {['transcribe', 'translate', `comment_${activeCommentTab}`]
                .filter(editorType => editorType !== activeEditor)
                .map(editorType => (
                  <button class="tab" key={editorType} onClick={onClickTab.bind(this, editorType)}>
                    {editorType.replace(/(_line|_verse)/, '')}
                  </button>
              ))}
            </div>
          )}
        </div>
        <tcs-popup ref={el => this.popupElement = el} />
      </Host>
    );
  }

}


const defaultEditorToolbarConfig: EditorToolbarConfig = {
  controls: {
    settings: true,
    reconstruction: true,
    annotation: true,
    layout: true,
    remove: true,
    structure: true,
    punctuation: true,
    abbreviation: true,
    deleted: true,
    highlighted: true,
    unclear: true,
    viewRaw: true,
    textDirection: true,
    textSize: true,
    blankSpace: true,
  },
};

const defaultEditorSettings: EditorSettings = {
  manuscript: {
    column: undefined,
    folio: undefined,
    book: undefined,
  }
}
