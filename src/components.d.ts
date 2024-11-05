/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DropdownConfig, EditorFormattedTEI, EditorSettings, EditorToolbarConfig, QuillInstance, TcsAnnotationFormValues, TcsBlankSpaceFormValues, TcsSelectEntry, TcsSettingsFormValues, TcsStructureFormValues, UnionAbbreviationType, UnionDeletedRend, UnionEditorLayoutType, UnionEditorType, UnionHighlightedRend, UnionIcons, UnionReconstructionReason, UnionStructureType, UnionUnclearReason, UnionVisualizerLayoutType, VisualizerToolbarConfig } from "./lib/types";
import { VisualizerToolbarConfig as VisualizerToolbarConfig1 } from "./components";
export { DropdownConfig, EditorFormattedTEI, EditorSettings, EditorToolbarConfig, QuillInstance, TcsAnnotationFormValues, TcsBlankSpaceFormValues, TcsSelectEntry, TcsSettingsFormValues, TcsStructureFormValues, UnionAbbreviationType, UnionDeletedRend, UnionEditorLayoutType, UnionEditorType, UnionHighlightedRend, UnionIcons, UnionReconstructionReason, UnionStructureType, UnionUnclearReason, UnionVisualizerLayoutType, VisualizerToolbarConfig } from "./lib/types";
export { VisualizerToolbarConfig as VisualizerToolbarConfig1 } from "./components";
export namespace Components {
    interface TcsAnnotationForm {
        "isValid": () => Promise<boolean>;
    }
    interface TcsBlankSpaceForm {
        "isValid": () => Promise<boolean>;
    }
    interface TcsButton {
        "active"?: boolean;
        "disabled"?: boolean;
        "display"?: 'slim'|'default';
        "icon"?: UnionIcons;
        "iconOnly"?: boolean;
        "iconPosition"?: 'leading' | 'trailing';
        "outlined"?: boolean;
        "rotateOnActive"?: boolean;
        "rounded"?: boolean;
        "slimText"?: string;
        "stretched"?: boolean;
        "variation"?: 'default';
    }
    interface TcsDropdown {
        "close": () => Promise<void>;
        "config": DropdownConfig;
        "disabled": boolean;
        "display"?: 'slim'|'default';
        "open": () => Promise<void>;
        "slimText"?: string;
    }
    interface TcsEditor {
        "getFormattedTEI": () => Promise<EditorFormattedTEI>;
        "getQuillInstances": () => Promise<Map<UnionEditorType, QuillInstance>>;
        "getSettings": () => Promise<EditorSettings>;
        "lock": () => Promise<void>;
        "setFormattedTEI": (tei: EditorFormattedTEI) => Promise<void>;
        "settings": EditorSettings;
        "toolbarConfig": EditorToolbarConfig;
        "unlock": () => Promise<void>;
    }
    interface TcsEditorToolbar {
        "config": EditorToolbarConfig;
        "disabled": boolean;
        "layoutType": UnionEditorLayoutType;
        "locked": boolean;
        "textDirection": 'LTR'|'RTL';
        "viewRaw": boolean;
    }
    interface TcsIcon {
        "icon": UnionIcons;
        "library"?: string;
        "viewBox"?: string;
    }
    interface TcsPopup {
        "closePopup": () => Promise<void>;
        "openPopup": () => Promise<void>;
        "setContent": (content: string) => Promise<void>;
    }
    interface TcsSelect {
        "entries": TcsSelectEntry[];
        "getValue": () => Promise<string | number>;
        "inputId": string;
        "inputName": string;
        "isValid": () => Promise<boolean>;
        "placeholder"?: string;
        "required"?: boolean;
        "setValue": (value: string) => Promise<void>;
    }
    interface TcsSettingsForm {
        "defaultValues": TcsSettingsFormValues;
        "isValid": () => Promise<boolean>;
    }
    interface TcsStructureForm {
        "isValid": () => Promise<boolean>;
    }
    interface TcsTextfield {
        "allowedValues"?: (string|number)[];
        "defaultValue": string;
        "getValue": () => Promise<string>;
        "inputId": string;
        "inputName": string;
        "integer"?: boolean;
        "isValid": () => Promise<boolean>;
        "max"?: number;
        "min"?: number;
        "pattern"?: string;
        "placeholder"?: string;
        "required"?: boolean;
        "setValue": (value: string) => Promise<void>;
        "type": 'text'|'password'|'number'|'email';
    }
    interface TcsVisualizer {
        "setDocumentViewerImage": (source: OpenSeadragon.TileSourceOptions) => Promise<void>;
        "toolbarConfig": VisualizerToolbarConfig;
    }
    interface TcsVisualizerToolbar {
        "config": VisualizerToolbarConfig1;
        "layoutType": UnionVisualizerLayoutType;
    }
}
export interface TcsAnnotationFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsAnnotationFormElement;
}
export interface TcsBlankSpaceFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsBlankSpaceFormElement;
}
export interface TcsButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsButtonElement;
}
export interface TcsEditorToolbarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsEditorToolbarElement;
}
export interface TcsIconCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsIconElement;
}
export interface TcsSelectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsSelectElement;
}
export interface TcsSettingsFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsSettingsFormElement;
}
export interface TcsStructureFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsStructureFormElement;
}
export interface TcsTextfieldCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsTextfieldElement;
}
export interface TcsVisualizerToolbarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTcsVisualizerToolbarElement;
}
declare global {
    interface HTMLTcsAnnotationFormElementEventMap {
        "formChange": TcsAnnotationFormValues;
        "formSubmit": TcsAnnotationFormValues;
    }
    interface HTMLTcsAnnotationFormElement extends Components.TcsAnnotationForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsAnnotationFormElementEventMap>(type: K, listener: (this: HTMLTcsAnnotationFormElement, ev: TcsAnnotationFormCustomEvent<HTMLTcsAnnotationFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsAnnotationFormElementEventMap>(type: K, listener: (this: HTMLTcsAnnotationFormElement, ev: TcsAnnotationFormCustomEvent<HTMLTcsAnnotationFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsAnnotationFormElement: {
        prototype: HTMLTcsAnnotationFormElement;
        new (): HTMLTcsAnnotationFormElement;
    };
    interface HTMLTcsBlankSpaceFormElementEventMap {
        "formChange": TcsBlankSpaceFormValues;
        "formSubmit": TcsBlankSpaceFormValues;
    }
    interface HTMLTcsBlankSpaceFormElement extends Components.TcsBlankSpaceForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsBlankSpaceFormElementEventMap>(type: K, listener: (this: HTMLTcsBlankSpaceFormElement, ev: TcsBlankSpaceFormCustomEvent<HTMLTcsBlankSpaceFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsBlankSpaceFormElementEventMap>(type: K, listener: (this: HTMLTcsBlankSpaceFormElement, ev: TcsBlankSpaceFormCustomEvent<HTMLTcsBlankSpaceFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsBlankSpaceFormElement: {
        prototype: HTMLTcsBlankSpaceFormElement;
        new (): HTMLTcsBlankSpaceFormElement;
    };
    interface HTMLTcsButtonElementEventMap {
        "clickButton": HTMLDivElement;
    }
    interface HTMLTcsButtonElement extends Components.TcsButton, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsButtonElementEventMap>(type: K, listener: (this: HTMLTcsButtonElement, ev: TcsButtonCustomEvent<HTMLTcsButtonElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsButtonElementEventMap>(type: K, listener: (this: HTMLTcsButtonElement, ev: TcsButtonCustomEvent<HTMLTcsButtonElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsButtonElement: {
        prototype: HTMLTcsButtonElement;
        new (): HTMLTcsButtonElement;
    };
    interface HTMLTcsDropdownElement extends Components.TcsDropdown, HTMLStencilElement {
    }
    var HTMLTcsDropdownElement: {
        prototype: HTMLTcsDropdownElement;
        new (): HTMLTcsDropdownElement;
    };
    interface HTMLTcsEditorElement extends Components.TcsEditor, HTMLStencilElement {
    }
    var HTMLTcsEditorElement: {
        prototype: HTMLTcsEditorElement;
        new (): HTMLTcsEditorElement;
    };
    interface HTMLTcsEditorToolbarElementEventMap {
        "clickViewRaw": void;
        "clickUnclear": UnionUnclearReason;
        "clickReconstruction": UnionReconstructionReason;
        "clickAnnotation": void;
        "clickHighlighted": UnionHighlightedRend;
        "clickDeleted": UnionDeletedRend;
        "clickAbbreviation": UnionAbbreviationType;
        "clickPunctuation": string;
        "clickStructure": UnionStructureType|'anonymous-block';
        "clickBlankSpace": void;
        "clickRTL": void;
        "clickLTR": void;
        "clickTextSize": void;
        "clickLayout": void;
        "clickRemove": void;
        "clickSettings": void;
    }
    interface HTMLTcsEditorToolbarElement extends Components.TcsEditorToolbar, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsEditorToolbarElementEventMap>(type: K, listener: (this: HTMLTcsEditorToolbarElement, ev: TcsEditorToolbarCustomEvent<HTMLTcsEditorToolbarElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsEditorToolbarElementEventMap>(type: K, listener: (this: HTMLTcsEditorToolbarElement, ev: TcsEditorToolbarCustomEvent<HTMLTcsEditorToolbarElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsEditorToolbarElement: {
        prototype: HTMLTcsEditorToolbarElement;
        new (): HTMLTcsEditorToolbarElement;
    };
    interface HTMLTcsIconElementEventMap {
        "clickIcon": SVGElement;
    }
    interface HTMLTcsIconElement extends Components.TcsIcon, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsIconElementEventMap>(type: K, listener: (this: HTMLTcsIconElement, ev: TcsIconCustomEvent<HTMLTcsIconElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsIconElementEventMap>(type: K, listener: (this: HTMLTcsIconElement, ev: TcsIconCustomEvent<HTMLTcsIconElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsIconElement: {
        prototype: HTMLTcsIconElement;
        new (): HTMLTcsIconElement;
    };
    interface HTMLTcsPopupElement extends Components.TcsPopup, HTMLStencilElement {
    }
    var HTMLTcsPopupElement: {
        prototype: HTMLTcsPopupElement;
        new (): HTMLTcsPopupElement;
    };
    interface HTMLTcsSelectElementEventMap {
        "selectChange": TcsSelectEntry|undefined;
    }
    interface HTMLTcsSelectElement extends Components.TcsSelect, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsSelectElementEventMap>(type: K, listener: (this: HTMLTcsSelectElement, ev: TcsSelectCustomEvent<HTMLTcsSelectElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsSelectElementEventMap>(type: K, listener: (this: HTMLTcsSelectElement, ev: TcsSelectCustomEvent<HTMLTcsSelectElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsSelectElement: {
        prototype: HTMLTcsSelectElement;
        new (): HTMLTcsSelectElement;
    };
    interface HTMLTcsSettingsFormElementEventMap {
        "formChange": TcsSettingsFormValues;
        "formSubmit": TcsSettingsFormValues;
    }
    interface HTMLTcsSettingsFormElement extends Components.TcsSettingsForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsSettingsFormElementEventMap>(type: K, listener: (this: HTMLTcsSettingsFormElement, ev: TcsSettingsFormCustomEvent<HTMLTcsSettingsFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsSettingsFormElementEventMap>(type: K, listener: (this: HTMLTcsSettingsFormElement, ev: TcsSettingsFormCustomEvent<HTMLTcsSettingsFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsSettingsFormElement: {
        prototype: HTMLTcsSettingsFormElement;
        new (): HTMLTcsSettingsFormElement;
    };
    interface HTMLTcsStructureFormElementEventMap {
        "formChange": TcsStructureFormValues;
        "formSubmit": TcsStructureFormValues;
    }
    interface HTMLTcsStructureFormElement extends Components.TcsStructureForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsStructureFormElementEventMap>(type: K, listener: (this: HTMLTcsStructureFormElement, ev: TcsStructureFormCustomEvent<HTMLTcsStructureFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsStructureFormElementEventMap>(type: K, listener: (this: HTMLTcsStructureFormElement, ev: TcsStructureFormCustomEvent<HTMLTcsStructureFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsStructureFormElement: {
        prototype: HTMLTcsStructureFormElement;
        new (): HTMLTcsStructureFormElement;
    };
    interface HTMLTcsTextfieldElementEventMap {
        "textfieldChange": string;
    }
    interface HTMLTcsTextfieldElement extends Components.TcsTextfield, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsTextfieldElementEventMap>(type: K, listener: (this: HTMLTcsTextfieldElement, ev: TcsTextfieldCustomEvent<HTMLTcsTextfieldElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsTextfieldElementEventMap>(type: K, listener: (this: HTMLTcsTextfieldElement, ev: TcsTextfieldCustomEvent<HTMLTcsTextfieldElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsTextfieldElement: {
        prototype: HTMLTcsTextfieldElement;
        new (): HTMLTcsTextfieldElement;
    };
    interface HTMLTcsVisualizerElement extends Components.TcsVisualizer, HTMLStencilElement {
    }
    var HTMLTcsVisualizerElement: {
        prototype: HTMLTcsVisualizerElement;
        new (): HTMLTcsVisualizerElement;
    };
    interface HTMLTcsVisualizerToolbarElementEventMap {
        "clickLayout": UnionVisualizerLayoutType;
    }
    interface HTMLTcsVisualizerToolbarElement extends Components.TcsVisualizerToolbar, HTMLStencilElement {
        addEventListener<K extends keyof HTMLTcsVisualizerToolbarElementEventMap>(type: K, listener: (this: HTMLTcsVisualizerToolbarElement, ev: TcsVisualizerToolbarCustomEvent<HTMLTcsVisualizerToolbarElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLTcsVisualizerToolbarElementEventMap>(type: K, listener: (this: HTMLTcsVisualizerToolbarElement, ev: TcsVisualizerToolbarCustomEvent<HTMLTcsVisualizerToolbarElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLTcsVisualizerToolbarElement: {
        prototype: HTMLTcsVisualizerToolbarElement;
        new (): HTMLTcsVisualizerToolbarElement;
    };
    interface HTMLElementTagNameMap {
        "tcs-annotation-form": HTMLTcsAnnotationFormElement;
        "tcs-blank-space-form": HTMLTcsBlankSpaceFormElement;
        "tcs-button": HTMLTcsButtonElement;
        "tcs-dropdown": HTMLTcsDropdownElement;
        "tcs-editor": HTMLTcsEditorElement;
        "tcs-editor-toolbar": HTMLTcsEditorToolbarElement;
        "tcs-icon": HTMLTcsIconElement;
        "tcs-popup": HTMLTcsPopupElement;
        "tcs-select": HTMLTcsSelectElement;
        "tcs-settings-form": HTMLTcsSettingsFormElement;
        "tcs-structure-form": HTMLTcsStructureFormElement;
        "tcs-textfield": HTMLTcsTextfieldElement;
        "tcs-visualizer": HTMLTcsVisualizerElement;
        "tcs-visualizer-toolbar": HTMLTcsVisualizerToolbarElement;
    }
}
declare namespace LocalJSX {
    interface TcsAnnotationForm {
        "onFormChange"?: (event: TcsAnnotationFormCustomEvent<TcsAnnotationFormValues>) => void;
        "onFormSubmit"?: (event: TcsAnnotationFormCustomEvent<TcsAnnotationFormValues>) => void;
    }
    interface TcsBlankSpaceForm {
        "onFormChange"?: (event: TcsBlankSpaceFormCustomEvent<TcsBlankSpaceFormValues>) => void;
        "onFormSubmit"?: (event: TcsBlankSpaceFormCustomEvent<TcsBlankSpaceFormValues>) => void;
    }
    interface TcsButton {
        "active"?: boolean;
        "disabled"?: boolean;
        "display"?: 'slim'|'default';
        "icon"?: UnionIcons;
        "iconOnly"?: boolean;
        "iconPosition"?: 'leading' | 'trailing';
        "onClickButton"?: (event: TcsButtonCustomEvent<HTMLDivElement>) => void;
        "outlined"?: boolean;
        "rotateOnActive"?: boolean;
        "rounded"?: boolean;
        "slimText"?: string;
        "stretched"?: boolean;
        "variation"?: 'default';
    }
    interface TcsDropdown {
        "config"?: DropdownConfig;
        "disabled"?: boolean;
        "display"?: 'slim'|'default';
        "slimText"?: string;
    }
    interface TcsEditor {
        "settings"?: EditorSettings;
        "toolbarConfig"?: EditorToolbarConfig;
    }
    interface TcsEditorToolbar {
        "config"?: EditorToolbarConfig;
        "disabled"?: boolean;
        "layoutType"?: UnionEditorLayoutType;
        "locked"?: boolean;
        "onClickAbbreviation"?: (event: TcsEditorToolbarCustomEvent<UnionAbbreviationType>) => void;
        "onClickAnnotation"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickBlankSpace"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickDeleted"?: (event: TcsEditorToolbarCustomEvent<UnionDeletedRend>) => void;
        "onClickHighlighted"?: (event: TcsEditorToolbarCustomEvent<UnionHighlightedRend>) => void;
        "onClickLTR"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickLayout"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickPunctuation"?: (event: TcsEditorToolbarCustomEvent<string>) => void;
        "onClickRTL"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickReconstruction"?: (event: TcsEditorToolbarCustomEvent<UnionReconstructionReason>) => void;
        "onClickRemove"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickSettings"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickStructure"?: (event: TcsEditorToolbarCustomEvent<UnionStructureType|'anonymous-block'>) => void;
        "onClickTextSize"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "onClickUnclear"?: (event: TcsEditorToolbarCustomEvent<UnionUnclearReason>) => void;
        "onClickViewRaw"?: (event: TcsEditorToolbarCustomEvent<void>) => void;
        "textDirection"?: 'LTR'|'RTL';
        "viewRaw"?: boolean;
    }
    interface TcsIcon {
        "icon"?: UnionIcons;
        "library"?: string;
        "onClickIcon"?: (event: TcsIconCustomEvent<SVGElement>) => void;
        "viewBox"?: string;
    }
    interface TcsPopup {
    }
    interface TcsSelect {
        "entries"?: TcsSelectEntry[];
        "inputId"?: string;
        "inputName"?: string;
        "onSelectChange"?: (event: TcsSelectCustomEvent<TcsSelectEntry|undefined>) => void;
        "placeholder"?: string;
        "required"?: boolean;
    }
    interface TcsSettingsForm {
        "defaultValues"?: TcsSettingsFormValues;
        "onFormChange"?: (event: TcsSettingsFormCustomEvent<TcsSettingsFormValues>) => void;
        "onFormSubmit"?: (event: TcsSettingsFormCustomEvent<TcsSettingsFormValues>) => void;
    }
    interface TcsStructureForm {
        "onFormChange"?: (event: TcsStructureFormCustomEvent<TcsStructureFormValues>) => void;
        "onFormSubmit"?: (event: TcsStructureFormCustomEvent<TcsStructureFormValues>) => void;
    }
    interface TcsTextfield {
        "allowedValues"?: (string|number)[];
        "defaultValue"?: string;
        "inputId"?: string;
        "inputName"?: string;
        "integer"?: boolean;
        "max"?: number;
        "min"?: number;
        "onTextfieldChange"?: (event: TcsTextfieldCustomEvent<string>) => void;
        "pattern"?: string;
        "placeholder"?: string;
        "required"?: boolean;
        "type"?: 'text'|'password'|'number'|'email';
    }
    interface TcsVisualizer {
        "toolbarConfig"?: VisualizerToolbarConfig;
    }
    interface TcsVisualizerToolbar {
        "config"?: VisualizerToolbarConfig1;
        "layoutType"?: UnionVisualizerLayoutType;
        "onClickLayout"?: (event: TcsVisualizerToolbarCustomEvent<UnionVisualizerLayoutType>) => void;
    }
    interface IntrinsicElements {
        "tcs-annotation-form": TcsAnnotationForm;
        "tcs-blank-space-form": TcsBlankSpaceForm;
        "tcs-button": TcsButton;
        "tcs-dropdown": TcsDropdown;
        "tcs-editor": TcsEditor;
        "tcs-editor-toolbar": TcsEditorToolbar;
        "tcs-icon": TcsIcon;
        "tcs-popup": TcsPopup;
        "tcs-select": TcsSelect;
        "tcs-settings-form": TcsSettingsForm;
        "tcs-structure-form": TcsStructureForm;
        "tcs-textfield": TcsTextfield;
        "tcs-visualizer": TcsVisualizer;
        "tcs-visualizer-toolbar": TcsVisualizerToolbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "tcs-annotation-form": LocalJSX.TcsAnnotationForm & JSXBase.HTMLAttributes<HTMLTcsAnnotationFormElement>;
            "tcs-blank-space-form": LocalJSX.TcsBlankSpaceForm & JSXBase.HTMLAttributes<HTMLTcsBlankSpaceFormElement>;
            "tcs-button": LocalJSX.TcsButton & JSXBase.HTMLAttributes<HTMLTcsButtonElement>;
            "tcs-dropdown": LocalJSX.TcsDropdown & JSXBase.HTMLAttributes<HTMLTcsDropdownElement>;
            "tcs-editor": LocalJSX.TcsEditor & JSXBase.HTMLAttributes<HTMLTcsEditorElement>;
            "tcs-editor-toolbar": LocalJSX.TcsEditorToolbar & JSXBase.HTMLAttributes<HTMLTcsEditorToolbarElement>;
            "tcs-icon": LocalJSX.TcsIcon & JSXBase.HTMLAttributes<HTMLTcsIconElement>;
            "tcs-popup": LocalJSX.TcsPopup & JSXBase.HTMLAttributes<HTMLTcsPopupElement>;
            "tcs-select": LocalJSX.TcsSelect & JSXBase.HTMLAttributes<HTMLTcsSelectElement>;
            "tcs-settings-form": LocalJSX.TcsSettingsForm & JSXBase.HTMLAttributes<HTMLTcsSettingsFormElement>;
            "tcs-structure-form": LocalJSX.TcsStructureForm & JSXBase.HTMLAttributes<HTMLTcsStructureFormElement>;
            "tcs-textfield": LocalJSX.TcsTextfield & JSXBase.HTMLAttributes<HTMLTcsTextfieldElement>;
            "tcs-visualizer": LocalJSX.TcsVisualizer & JSXBase.HTMLAttributes<HTMLTcsVisualizerElement>;
            "tcs-visualizer-toolbar": LocalJSX.TcsVisualizerToolbar & JSXBase.HTMLAttributes<HTMLTcsVisualizerToolbarElement>;
        }
    }
}
