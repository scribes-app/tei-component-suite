/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DropdownConfig, QuillInstance, ToolbarConfig, UnionAbbreviationType, UnionDeletedRend, UnionEditorType, UnionHighlightedRend, UnionIcons, UnionLayoutType, UnionStructureType, UnionUnclearReason, XecBlankSpaceFormValues, XecSelectEntry, XecStructureFormValues } from "./lib/types";
export { DropdownConfig, QuillInstance, ToolbarConfig, UnionAbbreviationType, UnionDeletedRend, UnionEditorType, UnionHighlightedRend, UnionIcons, UnionLayoutType, UnionStructureType, UnionUnclearReason, XecBlankSpaceFormValues, XecSelectEntry, XecStructureFormValues } from "./lib/types";
export namespace Components {
    interface XecBlankSpaceForm {
        "isValid": () => Promise<boolean>;
    }
    interface XecButton {
        "active"?: boolean;
        "disabled"?: boolean;
        "icon"?: UnionIcons;
        "iconOnly"?: boolean;
        "iconPosition"?: 'leading' | 'trailing';
        "outlined"?: boolean;
        "rotateOnActive"?: boolean;
        "rounded"?: boolean;
        "stretched"?: boolean;
        "variation"?: 'default';
    }
    interface XecDropdown {
        "close": () => Promise<void>;
        "config": DropdownConfig;
        "disabled": boolean;
        "open": () => Promise<void>;
    }
    interface XecEditor {
        "config": ToolbarConfig;
        "getQuillInstances": () => Promise<Map<UnionEditorType, QuillInstance>>;
        "lock": () => Promise<void>;
        "unlock": () => Promise<void>;
    }
    interface XecIcon {
        "icon": UnionIcons;
        "library"?: string;
        "viewBox"?: string;
    }
    interface XecPopup {
        "closePopup": () => Promise<void>;
        "openPopup": () => Promise<void>;
        "setContent": (content: string) => Promise<void>;
    }
    interface XecSelect {
        "entries": XecSelectEntry[];
        "getValue": () => Promise<string | number>;
        "inputId": string;
        "inputName": string;
        "isValid": () => Promise<boolean>;
        "placeholder"?: string;
        "required"?: boolean;
        "setValue": (value: string) => Promise<void>;
    }
    interface XecStructureForm {
        "isValid": () => Promise<boolean>;
    }
    interface XecTextfield {
        "allowedValues"?: (string|number)[];
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
    interface XecToolbar {
        "config": ToolbarConfig;
        "disabled": boolean;
        "layoutType": UnionLayoutType;
        "textDirection": 'LTR'|'RTL';
        "viewRaw": boolean;
    }
}
export interface XecBlankSpaceFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecBlankSpaceFormElement;
}
export interface XecButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecButtonElement;
}
export interface XecIconCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecIconElement;
}
export interface XecSelectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecSelectElement;
}
export interface XecStructureFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecStructureFormElement;
}
export interface XecTextfieldCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecTextfieldElement;
}
export interface XecToolbarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecToolbarElement;
}
declare global {
    interface HTMLXecBlankSpaceFormElementEventMap {
        "formChange": XecBlankSpaceFormValues;
        "formSubmit": XecBlankSpaceFormValues;
    }
    interface HTMLXecBlankSpaceFormElement extends Components.XecBlankSpaceForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecBlankSpaceFormElementEventMap>(type: K, listener: (this: HTMLXecBlankSpaceFormElement, ev: XecBlankSpaceFormCustomEvent<HTMLXecBlankSpaceFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecBlankSpaceFormElementEventMap>(type: K, listener: (this: HTMLXecBlankSpaceFormElement, ev: XecBlankSpaceFormCustomEvent<HTMLXecBlankSpaceFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecBlankSpaceFormElement: {
        prototype: HTMLXecBlankSpaceFormElement;
        new (): HTMLXecBlankSpaceFormElement;
    };
    interface HTMLXecButtonElementEventMap {
        "clickButton": HTMLDivElement;
    }
    interface HTMLXecButtonElement extends Components.XecButton, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecButtonElementEventMap>(type: K, listener: (this: HTMLXecButtonElement, ev: XecButtonCustomEvent<HTMLXecButtonElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecButtonElementEventMap>(type: K, listener: (this: HTMLXecButtonElement, ev: XecButtonCustomEvent<HTMLXecButtonElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecButtonElement: {
        prototype: HTMLXecButtonElement;
        new (): HTMLXecButtonElement;
    };
    interface HTMLXecDropdownElement extends Components.XecDropdown, HTMLStencilElement {
    }
    var HTMLXecDropdownElement: {
        prototype: HTMLXecDropdownElement;
        new (): HTMLXecDropdownElement;
    };
    interface HTMLXecEditorElement extends Components.XecEditor, HTMLStencilElement {
    }
    var HTMLXecEditorElement: {
        prototype: HTMLXecEditorElement;
        new (): HTMLXecEditorElement;
    };
    interface HTMLXecIconElementEventMap {
        "clickIcon": SVGElement;
    }
    interface HTMLXecIconElement extends Components.XecIcon, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecIconElementEventMap>(type: K, listener: (this: HTMLXecIconElement, ev: XecIconCustomEvent<HTMLXecIconElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecIconElementEventMap>(type: K, listener: (this: HTMLXecIconElement, ev: XecIconCustomEvent<HTMLXecIconElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecIconElement: {
        prototype: HTMLXecIconElement;
        new (): HTMLXecIconElement;
    };
    interface HTMLXecPopupElement extends Components.XecPopup, HTMLStencilElement {
    }
    var HTMLXecPopupElement: {
        prototype: HTMLXecPopupElement;
        new (): HTMLXecPopupElement;
    };
    interface HTMLXecSelectElementEventMap {
        "selectChange": XecSelectEntry|undefined;
    }
    interface HTMLXecSelectElement extends Components.XecSelect, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecSelectElementEventMap>(type: K, listener: (this: HTMLXecSelectElement, ev: XecSelectCustomEvent<HTMLXecSelectElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecSelectElementEventMap>(type: K, listener: (this: HTMLXecSelectElement, ev: XecSelectCustomEvent<HTMLXecSelectElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecSelectElement: {
        prototype: HTMLXecSelectElement;
        new (): HTMLXecSelectElement;
    };
    interface HTMLXecStructureFormElementEventMap {
        "formChange": XecStructureFormValues;
        "formSubmit": XecStructureFormValues;
    }
    interface HTMLXecStructureFormElement extends Components.XecStructureForm, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecStructureFormElementEventMap>(type: K, listener: (this: HTMLXecStructureFormElement, ev: XecStructureFormCustomEvent<HTMLXecStructureFormElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecStructureFormElementEventMap>(type: K, listener: (this: HTMLXecStructureFormElement, ev: XecStructureFormCustomEvent<HTMLXecStructureFormElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecStructureFormElement: {
        prototype: HTMLXecStructureFormElement;
        new (): HTMLXecStructureFormElement;
    };
    interface HTMLXecTextfieldElementEventMap {
        "textfieldChange": string;
    }
    interface HTMLXecTextfieldElement extends Components.XecTextfield, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecTextfieldElementEventMap>(type: K, listener: (this: HTMLXecTextfieldElement, ev: XecTextfieldCustomEvent<HTMLXecTextfieldElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecTextfieldElementEventMap>(type: K, listener: (this: HTMLXecTextfieldElement, ev: XecTextfieldCustomEvent<HTMLXecTextfieldElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecTextfieldElement: {
        prototype: HTMLXecTextfieldElement;
        new (): HTMLXecTextfieldElement;
    };
    interface HTMLXecToolbarElementEventMap {
        "clickViewRaw": void;
        "clickUnclear": UnionUnclearReason;
        "clickHighlighted": UnionHighlightedRend;
        "clickDeleted": UnionDeletedRend;
        "clickAbbreviation": UnionAbbreviationType;
        "clickStructure": UnionStructureType|'anonymous-block';
        "clickBlankSpace": void;
        "clickRTL": void;
        "clickLTR": void;
        "clickLayout": void;
    }
    interface HTMLXecToolbarElement extends Components.XecToolbar, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXecToolbarElementEventMap>(type: K, listener: (this: HTMLXecToolbarElement, ev: XecToolbarCustomEvent<HTMLXecToolbarElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXecToolbarElementEventMap>(type: K, listener: (this: HTMLXecToolbarElement, ev: XecToolbarCustomEvent<HTMLXecToolbarElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXecToolbarElement: {
        prototype: HTMLXecToolbarElement;
        new (): HTMLXecToolbarElement;
    };
    interface HTMLElementTagNameMap {
        "xec-blank-space-form": HTMLXecBlankSpaceFormElement;
        "xec-button": HTMLXecButtonElement;
        "xec-dropdown": HTMLXecDropdownElement;
        "xec-editor": HTMLXecEditorElement;
        "xec-icon": HTMLXecIconElement;
        "xec-popup": HTMLXecPopupElement;
        "xec-select": HTMLXecSelectElement;
        "xec-structure-form": HTMLXecStructureFormElement;
        "xec-textfield": HTMLXecTextfieldElement;
        "xec-toolbar": HTMLXecToolbarElement;
    }
}
declare namespace LocalJSX {
    interface XecBlankSpaceForm {
        "onFormChange"?: (event: XecBlankSpaceFormCustomEvent<XecBlankSpaceFormValues>) => void;
        "onFormSubmit"?: (event: XecBlankSpaceFormCustomEvent<XecBlankSpaceFormValues>) => void;
    }
    interface XecButton {
        "active"?: boolean;
        "disabled"?: boolean;
        "icon"?: UnionIcons;
        "iconOnly"?: boolean;
        "iconPosition"?: 'leading' | 'trailing';
        "onClickButton"?: (event: XecButtonCustomEvent<HTMLDivElement>) => void;
        "outlined"?: boolean;
        "rotateOnActive"?: boolean;
        "rounded"?: boolean;
        "stretched"?: boolean;
        "variation"?: 'default';
    }
    interface XecDropdown {
        "config"?: DropdownConfig;
        "disabled"?: boolean;
    }
    interface XecEditor {
        "config"?: ToolbarConfig;
    }
    interface XecIcon {
        "icon"?: UnionIcons;
        "library"?: string;
        "onClickIcon"?: (event: XecIconCustomEvent<SVGElement>) => void;
        "viewBox"?: string;
    }
    interface XecPopup {
    }
    interface XecSelect {
        "entries"?: XecSelectEntry[];
        "inputId"?: string;
        "inputName"?: string;
        "onSelectChange"?: (event: XecSelectCustomEvent<XecSelectEntry|undefined>) => void;
        "placeholder"?: string;
        "required"?: boolean;
    }
    interface XecStructureForm {
        "onFormChange"?: (event: XecStructureFormCustomEvent<XecStructureFormValues>) => void;
        "onFormSubmit"?: (event: XecStructureFormCustomEvent<XecStructureFormValues>) => void;
    }
    interface XecTextfield {
        "allowedValues"?: (string|number)[];
        "inputId"?: string;
        "inputName"?: string;
        "integer"?: boolean;
        "max"?: number;
        "min"?: number;
        "onTextfieldChange"?: (event: XecTextfieldCustomEvent<string>) => void;
        "pattern"?: string;
        "placeholder"?: string;
        "required"?: boolean;
        "type"?: 'text'|'password'|'number'|'email';
    }
    interface XecToolbar {
        "config"?: ToolbarConfig;
        "disabled"?: boolean;
        "layoutType"?: UnionLayoutType;
        "onClickAbbreviation"?: (event: XecToolbarCustomEvent<UnionAbbreviationType>) => void;
        "onClickBlankSpace"?: (event: XecToolbarCustomEvent<void>) => void;
        "onClickDeleted"?: (event: XecToolbarCustomEvent<UnionDeletedRend>) => void;
        "onClickHighlighted"?: (event: XecToolbarCustomEvent<UnionHighlightedRend>) => void;
        "onClickLTR"?: (event: XecToolbarCustomEvent<void>) => void;
        "onClickLayout"?: (event: XecToolbarCustomEvent<void>) => void;
        "onClickRTL"?: (event: XecToolbarCustomEvent<void>) => void;
        "onClickStructure"?: (event: XecToolbarCustomEvent<UnionStructureType|'anonymous-block'>) => void;
        "onClickUnclear"?: (event: XecToolbarCustomEvent<UnionUnclearReason>) => void;
        "onClickViewRaw"?: (event: XecToolbarCustomEvent<void>) => void;
        "textDirection"?: 'LTR'|'RTL';
        "viewRaw"?: boolean;
    }
    interface IntrinsicElements {
        "xec-blank-space-form": XecBlankSpaceForm;
        "xec-button": XecButton;
        "xec-dropdown": XecDropdown;
        "xec-editor": XecEditor;
        "xec-icon": XecIcon;
        "xec-popup": XecPopup;
        "xec-select": XecSelect;
        "xec-structure-form": XecStructureForm;
        "xec-textfield": XecTextfield;
        "xec-toolbar": XecToolbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "xec-blank-space-form": LocalJSX.XecBlankSpaceForm & JSXBase.HTMLAttributes<HTMLXecBlankSpaceFormElement>;
            "xec-button": LocalJSX.XecButton & JSXBase.HTMLAttributes<HTMLXecButtonElement>;
            "xec-dropdown": LocalJSX.XecDropdown & JSXBase.HTMLAttributes<HTMLXecDropdownElement>;
            "xec-editor": LocalJSX.XecEditor & JSXBase.HTMLAttributes<HTMLXecEditorElement>;
            "xec-icon": LocalJSX.XecIcon & JSXBase.HTMLAttributes<HTMLXecIconElement>;
            "xec-popup": LocalJSX.XecPopup & JSXBase.HTMLAttributes<HTMLXecPopupElement>;
            "xec-select": LocalJSX.XecSelect & JSXBase.HTMLAttributes<HTMLXecSelectElement>;
            "xec-structure-form": LocalJSX.XecStructureForm & JSXBase.HTMLAttributes<HTMLXecStructureFormElement>;
            "xec-textfield": LocalJSX.XecTextfield & JSXBase.HTMLAttributes<HTMLXecTextfieldElement>;
            "xec-toolbar": LocalJSX.XecToolbar & JSXBase.HTMLAttributes<HTMLXecToolbarElement>;
        }
    }
}
