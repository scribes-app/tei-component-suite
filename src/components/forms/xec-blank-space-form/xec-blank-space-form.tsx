import { Component, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { UnionBlankSpaceUnit, XecBlankSpaceFormValues } from '../../../lib/types';

@Component({
  tag: 'xec-blank-space-form',
  styleUrl: 'xec-blank-space-form.scss',
  shadow: true,
})
export class XecBlankSpaceForm {

  private selectRef: HTMLXecSelectElement;
  private textfieldRef: HTMLXecTextfieldElement;

  @Event()
  public formChange: EventEmitter<XecBlankSpaceFormValues>;

  @Event()
  public formSubmit: EventEmitter<XecBlankSpaceFormValues>;

  @State()
  private valid: boolean = false;

  @State()
  private values: XecBlankSpaceFormValues = {
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
        <xec-select
          ref={el => this.selectRef = el}
          required
          inputId="xec-blank-space-form-unit"
          inputName="xec-blank-space-form-unit"
          placeholder="Unit"
          onSelectChange={onChange.bind(this)}
          entries={[
            { id: 'cm', label: 'cm' },
            { id: 'char', label: 'char' },
          ]}
        />
        <xec-textfield
          ref={el => this.textfieldRef = el}
          required
          inputId="xec-blank-space-form-value"
          inputName="xec-blank-space-form-value"
          placeholder="Value"
          type="number"
          onTextfieldChange={onChange.bind(this)}
        />
        <xec-button
          outlined
          rounded
          disabled={!valid}
          onClickButton={onSubmit.bind(this)}
          >
          Insert
        </xec-button>
      </Host>
    );
  }
}

