import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';
import { TcsSelectEntry } from '../../lib/types';
import { onClickOutside, removeClickOutside } from '../../lib/helper';
import classNames from 'classnames';

@Component({
  tag: 'tcs-select',
  styleUrl: 'tcs-select.scss',
  shadow: true,
})
export class TcsSelect {

  private inputRef: HTMLInputElement;
  private wrapperRef: HTMLDivElement;
  private _listener: (this: Window, ev: MouseEvent) => any;

  @Event()
  public readonly selectChange: EventEmitter<TcsSelectEntry|undefined>;

  @Prop()
  public readonly inputId: string;

  @Prop()
  public readonly inputName: string;

  @Prop()
  public readonly entries: TcsSelectEntry[] = [];

  @Prop()
  public readonly placeholder?: string;

  @Prop()
  public readonly required?: boolean;

  @State()
  private selectedEntry: TcsSelectEntry;

  @State()
  private processedEntries: TcsSelectEntry[] = [];

  @State()
  private status: 'empty'|'selected' = 'empty';

  @State()
  private open: boolean = false;


  @Method()
  public async isValid(): Promise<boolean> {
    if ((this.inputRef as HTMLInputElement).required) {
      return this.inputRef!.checkValidity() && this.status === 'selected';
    } else {
      return this.inputRef!.checkValidity();
    }
  }

  @Method()
  public async getValue(): Promise<string|number> {
    return this.selectedEntry.id;
  }

  @Method()
  public async setValue(value: string): Promise<void> {
    const { processedEntries } = this;
    const selectedEntry = processedEntries.find(entry => entry.id === value);
    if (!selectedEntry) throw new Error('Invalid value');
    (this.inputRef as HTMLInputElement).value = selectedEntry.label;
    this.status = 'selected';
    this.selectChange.emit(selectedEntry);
  }

  componentWillLoad(): void {
    this.processingEntries();
  }

  componentDidLoad(): void {
    this.setClickOutside();
  }

  disconnectedCallback(): void {
    removeClickOutside(this._listener);
  }

  private onClick(): void {
    this.open = !this.open;
  }

  private onChange(event: MouseEvent, selectedEntry: TcsSelectEntry): void {
    event.stopPropagation();
    (this.inputRef as HTMLInputElement).value = selectedEntry.label;
    this.selectedEntry = selectedEntry;
    this.status = 'selected';
    this.open = false;
    this.selectChange.emit(selectedEntry);
  }

  private setClickOutside(): void {
    this._listener = onClickOutside(this.wrapperRef as HTMLElement, this.onClickOutside.bind(this));
  }

  private onClickOutside(): void {
    this.open = false;
  }

  private processingEntries(): void {
    const { entries } = this;
    const processedEntries = entries.map(({ id, label }) => {
      return {
        id,
        label: label.trim(),
        normalized: this.normalize(label),
      };
    });
    this.processedEntries = processedEntries;
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }

  render() {
    const {
      onChange,
      onClick,
      inputId: id,
      inputName: name,
      processedEntries,
      open,
      placeholder,
      required,
      status
    } = this;
    return (
      <Host class={classNames({
        open
      })}>
        <div
          class="wrapper"
          onClick={onClick.bind(this)}
          ref={el => this.wrapperRef = el}>
            <input
              class={classNames({
                input: true,
                [status]: true
              })}
              readOnly
              ref={el => this.inputRef = el}
              type="text"
              id={id}
              name={name}
              required={required}
              placeholder={placeholder}
            />
            <div class={classNames({
                choices: true,
                [status]: true
              })}>
              {processedEntries.map(entry => (
                <div class="choice" key={entry.id} onClick={e => onChange.call(this, e, entry)}>
                  {entry.label}
                </div>
              ))}
            </div>
            <div class="down">
              <tcs-icon class="icon" icon="angle-down" />
            </div>
        </div>
      </Host>
    );
  }
}
