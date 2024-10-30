import { Component, Event, EventEmitter, Host, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'tcs-textfield',
  styleUrl: 'tcs-textfield.scss',
  shadow: true,
})
export class TcsTextfield {

  private inputRef: HTMLInputElement;

  @Event()
  public readonly textfieldChange: EventEmitter<string>;

  @Prop()
  public readonly inputId: string;

  @Prop()
  public readonly defaultValue: string;

  @Prop()
  public readonly inputName: string;

  @Prop()
  public readonly placeholder?: string;

  @Prop()
  public readonly integer?: boolean;

  @Prop()
  public readonly min?: number;

  @Prop()
  public readonly max?: number;

  @Prop()
  public readonly allowedValues?: (string|number)[];

  @Prop()
  public readonly required?: boolean;

  @Prop()
  public readonly pattern?: string;

  @Prop()
  public readonly type: 'text'|'password'|'number'|'email' = 'text';

  @Method()
  public async isValid(): Promise<boolean> {
    return this.inputRef.checkValidity() && this.validateConstraints();
  }

  @Method()
  public async getValue(): Promise<string> {
    return this.inputRef.value;
  }

  @Method()
  public async setValue(value: string): Promise<void> {
    this.inputRef.value = value;
  }

  /**
   * Emit the input value
   */
  private onInput(event: InputEvent) {
    this.preventTypingText(event);
    this.checkMinMaxValue(event);
    this.textfieldChange.emit((event.target as HTMLInputElement).value);
  }

  /**
   * Prevent typing text in a number input, format the value if required
   */
  private preventTypingText(event: InputEvent): void {
    const { type, integer } = this;
    if (type !== 'number') return;
    let { value, selectionStart, selectionEnd } = event.target as HTMLInputElement;

    if (!value.match(/^[0-9]+\.?[0-9]*$/)) {
      const clearValue = [
        value.substring(0, (selectionStart as number) - 1),
        value.substring((selectionStart as number), value.length)
      ].join('');
      (event.target as HTMLInputElement).value = clearValue;
      (event.target as HTMLInputElement).selectionEnd = (selectionEnd as number) - 1;
    }

    if (value.match(/^0[0-9]{1,}\.?[0-9]*$/)) {
      const clearValue = value.substring(1);
      (event.target as HTMLInputElement).value = clearValue;
    }

    if (integer && value.match(/^[0-9]+\.[0-9]*$/)) {
      const clearValue = value.substring(0, value.length - 1);
      (event.target as HTMLInputElement).value = clearValue;
    }
  }

  /**
   * Check the min and max value of the input and set the value to the min or max if necessary
   */
  private checkMinMaxValue(event: InputEvent): void {
    const { type, integer, min, max } = this;
    if (type !== 'number') return;
    const { value } = event.target as HTMLInputElement;
    if (typeof min === 'number') {
      const numberValue = parseFloat(value);
      if (numberValue < min || isNaN(numberValue)) (event.target as HTMLInputElement).value = min.toString();
    }
    if (typeof max === 'number') {
      const numberValue = parseFloat(value);
      if (numberValue > max && integer) (event.target as HTMLInputElement).value = Math.round(max).toString();
      else if (numberValue > max) (event.target as HTMLInputElement).value = max.toString();
    }
  }

  /**
   * Validate the constraints of the input according to the props
   */
  private validateConstraints(): boolean {
    const { allowedValues, required, pattern, min, max } = this;
    const constraints: boolean[] = [true];
    const value = this.inputRef.value;
    if (allowedValues) constraints.push(allowedValues.includes(value));
    if (pattern) constraints.push(!!value.match(pattern));
    if (required) constraints.push(value !== '');
    if (min && !isNaN(parseFloat(value))) constraints.push(parseFloat(value) >= min);
    if (max && !isNaN(parseFloat(value))) constraints.push(parseFloat(value) <= max);
    return constraints.every(v => v);
  }

  render() {
    const {
      onInput,
      inputId: id,
      inputName: name,
      defaultValue,
      placeholder,
      min,
      max,
      required,
      pattern,
      type,
    } = this;
    return (
      <Host>
        <input
          id={id}
          name={name}
          // Keep the type as text to prevent the browser to disallow some of functionalities as selection etc
          type={type === 'number' ? 'text' : type}
          ref={el => this.inputRef = el}
          placeholder={placeholder}
          min={min}
          max={max}
          defaultValue={defaultValue}
          required={required}
          pattern={pattern}
          onInput={onInput.bind(this)}
        />
      </Host>
    );
  }

}
