import { Component, Host, h } from '@stencil/core';
import { Fragment, JSX, Method, Prop, State } from '@stencil/core/internal';
import classNames from 'classnames';
import * as escaper from 'html-escaper';
import Quill from 'quill';
import { registerBlots } from '../../lib/helper';
import { XmlTransformerService } from '../../lib/services/xml-transformer.service';
import { EditorState, QuillInstance, ToolbarConfig, UnionAbbreviationType, UnionDeletedRend, UnionEditorType, UnionHighlightedRend, UnionUnclearReason } from '../../lib/types';

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
  private editorInstances: Map<UnionEditorType, QuillInstance> = new Map();
  private editorElements: Map<UnionEditorType, HTMLDivElement> = new Map();
  private popupElement: HTMLXecPopupElement;

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
  }

  /**
   * Initialize the Quill editor
   */
  private initQuillInstances(): void {
    registerBlots();

    for (const [editorType, editorElement] of Array.from(this.editorElements.entries())) {
      const instance = new Quill(editorElement);
      instance.root.addEventListener('focus', this.onFocusEditor.bind(this, editorType));
      this.editorInstances.set(editorType, instance);
    }

    this.activeInstance = this.editorInstances.get(this.activeEditor);
  }

  /**
   * Switch active instance according to the current focused editor
   */
  private onFocusEditor(editorType: UnionEditorType): void {
    this.activeInstance = this.editorInstances.get(editorType);
    this.activeEditor = editorType;
  }

  /**
   * Handle the click on the view raw button
   * Toggle the view between raw and default
   */
  private onClickViewRaw(): void {
    const editorState = this.editorStates.get(this.activeEditor);
    const method = editorState.viewType === 'raw' ? 'unescape' : 'escape';
    const sanitizedHTML = XmlTransformerService.sanitizeXMLFromEditor(this.activeInstance.root.innerHTML);
    this.activeInstance.clipboard.dangerouslyPasteHTML(escaper[method](sanitizedHTML));
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

  private onClickViewXML(): void {
    this.popupElement.openPopup();
  }

  private onClickBlankSpace(): void {
    this.popupElement.setContent(
      <Fragment>
        <xec-select
          placeholder="Unit"
          entries={[
            { id: 'cm', label: 'cm' },
            { id: 'char', label: 'char' },
          ]}
        />
        <xec-textfield
          placeholder="Value"
          type="number"
          integer
        />
        <xec-button outlined rounded onClickButton={() => this.popupElement.closePopup()}>Insert</xec-button>
      </Fragment>
    )
    this.popupElement.openPopup();
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
      onClickLTR,
      onClickRTL,
      onClickViewRaw,
      onClickViewXML,
      onClickUnclear,
      onClickHighlighted,
      onClickDeleted,
      onClickAbbreviation,
      onClickBlankSpace,
      config,
      activeEditor,
      editorStates,
    } = this;
    return (
      <Host>
        <xec-toolbar
          class="toolbar"
          config={config}
          onClickViewRaw={onClickViewRaw.bind(this)}
          onClickRTL={onClickRTL.bind(this)}
          onClickLTR={onClickLTR.bind(this)}
          onClickViewXML={onClickViewXML.bind(this)}
          onClickUnclear={onClickUnclear.bind(this)}
          onClickHighlighted={onClickHighlighted.bind(this)}
          onClickDeleted={onClickDeleted.bind(this)}
          onClickAbbreviation={onClickAbbreviation.bind(this)}
          onClickBlankSpace={onClickBlankSpace.bind(this)}
          textDirection={editorStates.get(activeEditor).textDirection}
          viewRaw={editorStates.get(activeEditor).viewType === 'raw'}
        />
        <div class="editors">
          <div
            class={classNames({
              editor: true,
              transcribe: true,
              active: activeEditor === 'transcribe'
            })}
            ref={el => this.editorElements.set('transcribe', el)}
          />
          <div
            class={classNames({
              editor: true,
              translate: true,
              active: activeEditor === 'translate'
            })}
            ref={el => this.editorElements.set('translate', el)}
          />
          <div
            class={classNames({
              editor: true,
              comment: true,
              active: activeEditor === 'comment'
            })}
            ref={el => this.editorElements.set('comment', el)}
          />
        </div>
        <xec-popup ref={el => this.popupElement = el} />
      </Host>
    );
  }

}


const defaultToolbarConfig: ToolbarConfig = {
  controls: {
    abbreviation: true,
    deleted: true,
    highlighted: true,
    unclear: true,
    viewRaw: true,
    viewXML: true,
    textDirection: true,
    blankSpace: true,
  },
};
