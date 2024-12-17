import { Component, Element, Host, Method, Prop, State, h } from '@stencil/core';
import { TcsButton } from '../tcs-button/tcs-button';
import { onClickOutside } from '../../lib/helper';

@Component({
  tag: 'tcs-context-menu',
  styleUrl: 'tcs-context-menu.scss',
  shadow: true,
})
export class TcsContextMenu {

  private _listener: ReturnType<typeof onClickOutside>;

  @Element()
  private readonly element: HTMLElement;

  @Prop()
  public readonly controls: {
    label: string,
    click: () => any,
    icon?: TcsButton['icon'],
  }[];

  @State()
  public isOpen: boolean = false;

  @State()
  public x: number = 0;

  @State()
  public y: number = 0;

  @Method()
  public async open(x: number, y: number): Promise<void> {
    this.isOpen = true;
    this.x = x;
    this.y = y;
  }

  @Method()
  public async close(): Promise<void> {
    this.isOpen = false;
  }

  componentDidLoad() {
    this.setOnClickOutside();
  }

  private setOnClickOutside(): void {
    this._listener = this.onClickOutside.bind(this);
    onClickOutside(this.element, this._listener);
  }

  private onClickOutside(): void {
    this.isOpen = false;
  }

  private onClickControl(control: typeof this.controls[number]): void {
    control.click();
    this.close();
  }

  render() {
    const {
      onClickControl,
      isOpen,
      controls
    } = this;
    return (
      <Host
        class={{
          open: isOpen,
        }}
        style={{
          top: `${this.y}px`,
          left: `${this.x}px`,
        }}>
        {controls.map((control, index) => (
          <tcs-button
            key={index}
            stretched
            icon={control.icon}
            iconPosition="leading"
            onClickButton={onClickControl.bind(this, control)}>
            {control.label}
          </tcs-button>
        ))}
      </Host>
    );
  }
}
