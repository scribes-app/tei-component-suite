import { Component, Host, h } from '@stencil/core';
import { JSX, Method, Prop, State } from '@stencil/core/internal';
import classNames from 'classnames';
import Quill from 'quill';
import { XecBlankSpaceFormCustomEvent } from '../../components';
import { TagName, delayed, registerBlots } from '../../lib/helper';
import { EditorState, QuillInstance, ToolbarConfig, UnionAbbreviationType, UnionDeletedRend, UnionEditorType, UnionHighlightedRend, UnionLayoutType, UnionUnclearReason, XecBlankSpaceFormValues, XecStructureFormValues } from '../../lib/types';
import { XMLTransformerService } from '../../services/xml-transformer.service';
import { Delta } from 'quill/core';

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

  @Prop()
  public readonly config: ToolbarConfig = defaultToolbarConfig;

  @State()
  private editorStates: Map<UnionEditorType, EditorState> = new Map([
    ['transcribe', { viewType: 'default', textDirection: 'LTR' }],
    ['translate', { viewType: 'default', textDirection: 'LTR' }],
    ['comment', { viewType: 'default', textDirection: 'LTR' }],
  ]);

  @State()
  private activeEditor: UnionEditorType = 'transcribe';

  @State()
  private layoutType: UnionLayoutType = 'columns';

  @Method()
  public async getQuillInstances(): Promise<Map<UnionEditorType, QuillInstance>> {
    return this.editorInstances;
  }

  @Method()
  public async lock(): Promise<void> {
    Array.from(this.editorInstances.values())
      .forEach(instance => instance.disable());
  }

  @Method()
  public async unlock(): Promise<void> {
    Array.from(this.editorInstances.values())
      .forEach(instance => instance.enable());
  }

  /**
   * Lifecycle hook called when the component has rendered
   */
  public componentDidLoad(): void {
    this.initQuillInstances();
    this.initTextareaElements();
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
    // Insert a new block (a line in the editor point of view) or delete it
    if (delta.ops.at(1)?.attributes?.block || delta.ops.at(1)?.delete || delta.ops.at(0)?.delete) {
      const instance = this.editorInstances.get(editorType);
      const range = instance.getSelection();
      instance.root.innerHTML = XMLTransformerService.addClasses(instance.root.innerHTML);

      this.concurrentTextChange = true;
      this.syncLines();
      delayed(() => {
        instance.setSelection({ index: (range?.index ?? 0) + 1, length: 0 });
        this.concurrentTextChange = false;
      }, 15);
    }
  }

  /**
   * Sync the lines between the editors
   */
  private syncLines(): void {
    const ln = this.activeInstance.getLines().length;
    for (const instance of [this.editorInstances.get('translate'), this.editorInstances.get('comment')]) {
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
    this.activeInstance.format('blank-space', event.detail);
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

  private onClickLayout(): void {
    this.layoutType = this.layoutType === 'columns' ? 'tabs' : 'columns';
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

    this.activeInstance.format(blot, params);

    const range = this.activeInstance.getSelection();
    this.activeInstance.root.innerHTML = XMLTransformerService.addClasses(this.activeInstance.root.innerHTML);
    delayed(() => {
      this.activeInstance.setSelection(range);
    }, 15);
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
      onClickRemove,
      onClickStructure,
      onClickLayout,
      config,
      activeEditor,
      editorStates,
      layoutType
    } = this;
    return (
      <Host>
        <xec-toolbar
          class="toolbar"
          config={config}
          onClickViewRaw={onClickViewRaw.bind(this)}
          onClickRTL={onClickRTL.bind(this)}
          onClickLTR={onClickLTR.bind(this)}
          onClickUnclear={onClickUnclear.bind(this)}
          onClickHighlighted={onClickHighlighted.bind(this)}
          onClickDeleted={onClickDeleted.bind(this)}
          onClickAbbreviation={onClickAbbreviation.bind(this)}
          onClickBlankSpace={onClickBlankSpace.bind(this)}
          onClickStructure={onClickStructure.bind(this)}
          onClickLayout={onClickLayout.bind(this)}
          onClickRemove={onClickRemove.bind(this)}
          layoutType={layoutType}
          textDirection={editorStates.get(activeEditor).textDirection}
          viewRaw={editorStates.get(activeEditor).viewType === 'raw'}
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
            active: activeEditor === 'comment'
          })}>
            <div
              class={classNames({
                editor: true,
                hidden: editorStates.get('comment').viewType === 'raw',
              })}
              ref={el => this.editorElements.set('comment', el)}
            />
            <textarea class={classNames({
                editor: true,
                hidden: editorStates.get('comment').viewType === 'default',
                textarea: true,
              })}
              ref={el => this.textareaElements.set('comment', el)}
            />
          </div>
          {layoutType === 'tabs' && (
            <div class="tabs">
              {['transcribe', 'translate', 'comment']
                .filter(editorType => editorType !== activeEditor)
                .map(editorType => (
                  <button class="tab" key={editorType} onClick={onClickTab.bind(this, editorType)}>
                    {editorType}
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
    layout: true,
    remove: true,
    structure: true,
    abbreviation: true,
    deleted: true,
    highlighted: true,
    unclear: true,
    viewRaw: true,
    textDirection: true,
    blankSpace: true,
  },
};
