import { Component, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { UnionBlankSpaceUnit, TcsBlankSpaceFormValues } from '../../../lib/types';

@Component({
  tag: 'tcs-blank-space-form',
  styleUrl: 'tcs-blank-space-form.scss',
  shadow: true,
})
export class TcsBlankSpaceForm {

  private selectRef: HTMLTcsSelectElement;
  private textfieldRef: HTMLTcsTextfieldElement;

  @Event()
  public formChange: EventEmitter<TcsBlankSpaceFormValues>;

  @Event()
  public formSubmit: EventEmitter<TcsBlankSpaceFormValues>;

  @State()
  private valid: boolean = false;

  @State()
  private values: TcsBlankSpaceFormValues = {
    unit: undefined,
    value: undefined
  };

  @Method()
  public async isValid(): Promise<boolean> {
    return (await this.selectRef.isValid()) && (await this.textfieldRef.isValid());
  }

  public async componentDidLoad(): Promise<void> {
    this.valid = await this.isValid();
  }

  private async onSubmit(): Promise<void> {
    this.formSubmit.emit(this.values);
  }

  private async onChange(): Promise<void> {
    const unit = await this.selectRef.getValue() as UnionBlankSpaceUnit;
    const value = Number(await this.textfieldRef.getValue());
    this.valid = await this.isValid();
    this.values = { unit, value };
    this.formChange.emit(this.values);
  }

  render() {
    const {
      valid,
      onChange,
      onSubmit
    } = this;
    return (
      <Host>
        <tcs-select
          ref={el => this.selectRef = el}
          required
          inputId="tcs-blank-space-form-unit"
          inputName="tcs-blank-space-form-unit"
          placeholder="Unit"
          onSelectChange={onChange.bind(this)}
          entries={[
            { id: 'cm', label: 'cm' },
            { id: 'char', label: 'char' },
          ]}
        />
        <tcs-textfield
          ref={el => this.textfieldRef = el}
          required
          inputId="tcs-blank-space-form-value"
          inputName="tcs-blank-space-form-value"
          placeholder="Value"
          type="number"
          onTextfieldChange={onChange.bind(this)}
        />
        <tcs-button
          outlined
          rounded
          disabled={!valid}
          onClickButton={onSubmit.bind(this)}
          >
          Insert
        </tcs-button>
      </Host>
    );
  }
}

