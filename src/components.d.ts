/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { QuillInstance, ToolbarConfig, UnionIcons } from "./lib/types";
export { QuillInstance, ToolbarConfig, UnionIcons } from "./lib/types";
export namespace Components {
    interface XecButton {
        "icon"?: UnionIcons;
        "variation"?: 'default';
    }
    interface XecEditor {
        "config": ToolbarConfig;
        "getQuillInstance": () => Promise<QuillInstance>;
    }
    interface XecIcon {
        "icon": UnionIcons;
        "library"?: string;
        "viewBox"?: string;
    }
    interface XecToolbar {
        "config": ToolbarConfig;
    }
}
export interface XecButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecButtonElement;
}
export interface XecIconCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXecIconElement;
}
declare global {
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
    interface HTMLXecToolbarElement extends Components.XecToolbar, HTMLStencilElement {
    }
    var HTMLXecToolbarElement: {
        prototype: HTMLXecToolbarElement;
        new (): HTMLXecToolbarElement;
    };
    interface HTMLElementTagNameMap {
        "xec-button": HTMLXecButtonElement;
        "xec-editor": HTMLXecEditorElement;
        "xec-icon": HTMLXecIconElement;
        "xec-toolbar": HTMLXecToolbarElement;
    }
}
declare namespace LocalJSX {
    interface XecButton {
        "icon"?: UnionIcons;
        "onClickButton"?: (event: XecButtonCustomEvent<HTMLDivElement>) => void;
        "variation"?: 'default';
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
    interface XecToolbar {
        "config"?: ToolbarConfig;
    }
    interface IntrinsicElements {
        "xec-button": XecButton;
        "xec-editor": XecEditor;
        "xec-icon": XecIcon;
        "xec-toolbar": XecToolbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "xec-button": LocalJSX.XecButton & JSXBase.HTMLAttributes<HTMLXecButtonElement>;
            "xec-editor": LocalJSX.XecEditor & JSXBase.HTMLAttributes<HTMLXecEditorElement>;
            "xec-icon": LocalJSX.XecIcon & JSXBase.HTMLAttributes<HTMLXecIconElement>;
            "xec-toolbar": LocalJSX.XecToolbar & JSXBase.HTMLAttributes<HTMLXecToolbarElement>;
        }
    }
}
