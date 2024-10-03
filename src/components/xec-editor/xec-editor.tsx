import { Component, Host, h } from '@stencil/core';
import { Element, JSX, Method, Prop, State, Watch } from '@stencil/core/internal';
import classNames from 'classnames';
import Quill from 'quill';
import { Delta, Range } from 'quill/core';
import { XecBlankSpaceFormCustomEvent } from '../../components';
import { Punctuations, TagName, capitalize, delayed, generateId, registerBlots } from '../../lib/helper';
import { EditorFormattedTEI, EditorSettings, EditorState, QuillInstance, ToolbarConfig, UnionAbbreviationType, UnionCommentType, UnionDeletedRend, UnionEditorType, UnionHighlightedRend, UnionLayoutType, UnionReconstructionReason, UnionUnclearReason, XecAnnotationFormValues, XecBlankSpaceFormValues, XecSettingsFormValues, XecStructureFormValues } from '../../lib/types';
import { XMLTransformerService } from '../../services/xml-transformer.service';
import { QuillService } from '../../services/quill.service';
@Component({
  tag: 'xec-editor',
  styleUrls: [
    'xec-editor.scss'
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
export class XecEditor {

  private activeInstance: QuillInstance;
  private activeTextarea: HTMLTextAreaElement;
  private editorInstances: Map<UnionEditorType, QuillInstance> = new Map();
  private editorElements: Map<UnionEditorType, HTMLDivElement> = new Map();
  private textareaElements: Map<UnionEditorType, HTMLTextAreaElement> = new Map();
  private popupElement: HTMLXecPopupElement;
  private concurrentTextChange: boolean = false;

  @Element()
  private element: HTMLElement;

  @Prop({ mutable: true })
  public toolbarConfig: ToolbarConfig = defaultToolbarConfig;

  @Prop({ mutable: true })
  public settings: EditorSettings = defaultEditorSettings;

  @State()
  private editorStates: Map<UnionEditorType, EditorState> = new Map([
    ['transcribe', { viewType: 'default', textDirection: 'LTR' }],
    ['translate', { viewType: 'default', textDirection: 'LTR' }],
    ['comment_line', { viewType: 'default', textDirection: 'LTR' }],
    ['comment_verse', { viewType: 'default', textDirection: 'LTR' }],
  ]);

  @State()
  private activeEditor: UnionEditorType = 'transcribe';

  @State()
  private activeCommentTab: UnionCommentType = 'line';

  @State()
  private layoutType: UnionLayoutType = 'columns';

  @State()
  private locked: boolean = false;

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
  public watchToolbarConfig(next?: string|object): void {
    if (!next || typeof next === 'object') return;
    this.toolbarConfig = JSON.parse(next);
  }

  /**
   * Lifecycle hook called when the component has rendered
   */
  public componentDidLoad(): void {
    this.initQuillInstances();
    this.initTextareaElements();
  }

  /**
   * Lifecycle hook called before the component is rendered
   */
  public componentWillLoad(): void {
    this.element.getAttribute('settings') ? this.watchSettings(this.element.getAttribute('settings')) : defaultEditorSettings;
    this.element.getAttribute('toolbarConfig') ? this.watchToolbarConfig(this.element.getAttribute('toolbarConfig')) : defaultToolbarConfig;

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
      this.editorInstances.set(editorType, instance);
    }

    this.activeInstance = this.editorInstances.get(this.activeEditor);
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
   * Handle the text change event
   */
  private onTextChange(editorType: UnionEditorType, delta: Delta): void {
    if (this.concurrentTextChange) return;

    const isNewBlock = delta.ops.at(0)?.attributes?.block || delta.ops.at(1)?.attributes?.block;
    const isDelete = delta.ops.at(0)?.delete || delta.ops.at(1)?.delete;
    const isSpace = delta.ops.at(0)?.insert === ' ' || delta.ops.at(1)?.insert === ' ';
    const isCharacter = delta.ops.at(0)?.insert && delta.ops.at(0)?.insert !== ' ' || delta.ops.at(1)?.insert !== ' ';

    // Insert a new block (a line in the editor point of view) or delete it
    if (isNewBlock || isDelete) {
      this.concurrentTextChange = true;

      const instance = this.editorInstances.get(editorType);
      const range = instance.getSelection();
      instance.root.innerHTML = XMLTransformerService.addClasses(instance.root.innerHTML);
      const nextPosition = (range?.index ?? 0) + (isNewBlock ? 1 : 0);

      this.syncLines();
      delayed(() => {
        instance.setSelection({ index: nextPosition, length: 0 });
        this.concurrentTextChange = false;
      }, 15);
    }

    // Wrap words at each space
    if (isSpace) {
      this.concurrentTextChange = true;
      const instance = this.editorInstances.get(editorType);
      const characters = instance.getText().split('');
      const wordPositions: { index: number; length: number }[] = characters.reduce((acc, char, index) => {
        if (char === ' ') acc.push({ index: index + 1, length: 0 });
        else if (acc.length === 0) acc.push({ index, length: 1 });
        else acc[acc.length - 1].length++;
        return acc;
      }, []);
      wordPositions.forEach(({ index, length }) => {
        instance.formatText(index, length, 'word', true);
        instance.formatText(index - 1, 1, 'word', true);
      });
      this.concurrentTextChange = false;
    }

    // Merge words while deleting a space
    if (isDelete) {
      this.concurrentTextChange = true;
      const retain = delta.ops.at(0)?.retain as number ?? 0;
      const prevChar = this.activeInstance.getText(new Range(retain - 1, 1))
      const nextChar = this.activeInstance.getText(new Range(retain + 1, 1))
      if (prevChar !== ' ' && nextChar !== ' ') {
        const prevSpaceIndex = this.activeInstance.getText().lastIndexOf(' ', retain);
        const nextSpaceIndex = this.activeInstance.getText().indexOf(' ', retain);
        const length = nextSpaceIndex - prevSpaceIndex;
        this.activeInstance.formatText(prevSpaceIndex, length, 'word', generateId());
      }
      this.concurrentTextChange = false;
    }

    // Merge words while typing a character at the end or the beginning of a word
    if (isCharacter) {
      this.concurrentTextChange = true;
      const retain = delta.ops.at(0)?.retain as number ?? 0;
      const prevChar = this.activeInstance.getText(new Range(retain - 1, 1))
      const nextChar = this.activeInstance.getText(new Range(retain + 1, 1))
      if (prevChar === ' ' && nextChar !== ' ') {
        const nextSpaceIndex = this.activeInstance.getText().indexOf(' ', retain);
        const nextWordLength = nextSpaceIndex - retain;
        this.activeInstance.formatText(retain, nextWordLength, 'word', generateId());
      }
      if (nextChar === ' ' && prevChar !== ' ') {
        const prevSpaceIndex = this.activeInstance.getText().lastIndexOf(' ', retain);
        const prevWordLength = retain - prevSpaceIndex;
        this.activeInstance.formatText(prevSpaceIndex, prevWordLength + 1, 'word', generateId());
      }
      this.concurrentTextChange = false;
    }
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
    if (editorState.viewType === 'raw') {
      const editorContent = XMLTransformerService.XML2Editor(this.activeTextarea.value);
      this.activeInstance.root.innerHTML = XMLTransformerService.addClasses(editorContent);
    } else {
      const xmlContent = XMLTransformerService.editor2XML(this.activeInstance.root.innerHTML);
      this.activeTextarea.value = XMLTransformerService.removeClasses(xmlContent);
    }
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
      <xec-blank-space-form
        onFormSubmit={this.onSubmitBlankSpaceForm.bind(this)}
      />
    )
    this.popupElement.openPopup();
  }

  private onSubmitBlankSpaceForm(event: XecBlankSpaceFormCustomEvent<XecBlankSpaceFormValues>): void {
    this.popupElement.closePopup();
    this.activeInstance.focus();
    const range = this.activeInstance.getSelection();
    this.activeInstance.insertEmbed(range.index, 'blank-space', event.detail);
    this.activeInstance.setSelection({ index: range.index + 1, length: 0 });
  }

  private onClickUnclear(event: CustomEvent<UnionUnclearReason>): void {
    const { detail: reason } = event;
    this.activeInstance.format('unclear', reason);
  }

  private onClickHighlighted(event: CustomEvent<UnionHighlightedRend>): void {
    const { detail: rend } = event;
    this.activeInstance.format('highlighted', rend);
  }

  private onClickDeleted(event: CustomEvent<UnionDeletedRend>): void {
    const { detail: rend } = event;
    this.activeInstance.format('deleted', rend);
  }

  private onClickAbbreviation(event: CustomEvent<UnionAbbreviationType>): void {
    const { detail: type } = event;
    this.activeInstance.format('abbreviation', type);
  }

  private onClickPunctuation(event: CustomEvent<typeof Punctuations[number]>): void {
    const { detail: type } = event;
    this.activeInstance.focus();
    const range = this.activeInstance.getSelection();
    this.activeInstance.insertEmbed(range.index, 'punctuation', type);
    this.activeInstance.setSelection({ index: range.index + 1, length: 0 });
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
    this.activeInstance.deleteText(range);
    this.activeInstance.insertText(range.index, text);
  }

  private onClickStructure(): void {
    this.popupElement.setContent(
      <xec-structure-form
        onFormSubmit={this.onSubmitStructureForm.bind(this)}
      />
    );
    this.popupElement.openPopup();
  }

  private onSubmitStructureForm(event: CustomEvent<XecStructureFormValues>): void {
    this.popupElement.closePopup();
    const blot = event.detail.type === 'anonymous-block' ? 'anonymous-block' : 'structure';
    const params = event.detail.type === 'anonymous-block' ? event.detail.ref : { type: event.detail.type, n: event.detail.ref };

    this.activeInstance.focus();
    if (event.detail.type === 'anonymous-block') {
      const selection = this.activeInstance.getSelection();
      QuillService.wrap(
        this.activeInstance,
        selection,
        TagName.ANONYMOUS_BLOCK,
        [{ key: 'n', value: event.detail.ref }]
      );
    } else {
      this.activeInstance.format(blot, params);
    }

    const range = this.activeInstance.getSelection();
    this.activeInstance.root.innerHTML = XMLTransformerService.addClasses(this.activeInstance.root.innerHTML);
    delayed(() => {
      this.activeInstance.setSelection(range);
    }, 15);
  }

  private onClickSettings(): void {
    this.popupElement.setContent(
      <xec-settings-form
        defaultValues={this.settings.manuscript}
        onFormSubmit={this.onSubmitSettingsForm.bind(this)}
      />
    );
    this.popupElement.openPopup();
  }

  private onSubmitSettingsForm(event: CustomEvent<XecSettingsFormValues>): void {
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
      <xec-annotation-form
        onFormSubmit={this.onSubmitAnnotationForm.bind(this)}
      />
    );
    this.popupElement.openPopup();
  }

  private onSubmitAnnotationForm(event: CustomEvent<XecAnnotationFormValues>): void {
    this.popupElement.closePopup();
    this.activeInstance.focus();
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
  }

  private onClickReconstruction(event: CustomEvent<UnionReconstructionReason>): void {
    const { detail: reason } = event;
    this.activeInstance.format('reconstruction', reason);
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
        <xec-toolbar
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
            <xec-dropdown
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
        <xec-popup ref={el => this.popupElement = el} />
      </Host>
    );
  }

}


const defaultToolbarConfig: ToolbarConfig = {
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
