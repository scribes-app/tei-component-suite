import { Component, Event, EventEmitter, Host, Method, State, h } from '@stencil/core';
import { UnionStructureType } from '../../../components';
import { TcsStructureFormValues } from '../../../lib/types';

@Component({
  tag: 'tcs-structure-form',
  styleUrl: 'tcs-structure-form.scss',
  shadow: true,
})
export class TcsStructureForm {

  private selectRef: HTMLTcsSelectElement;
  private textfieldRef: HTMLTcsTextfieldElement;

  @Event()
  public formChange: EventEmitter<TcsStructureFormValues>;

  @Event()
  public formSubmit: EventEmitter<TcsStructureFormValues>;

  @State()
  private valid: boolean = false;

  @State()
  private values: TcsStructureFormValues = {
    type: undefined,
    ref: undefined
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
    const type = await this.selectRef.getValue() as UnionStructureType|'anonymous-block';
    const ref = await this.textfieldRef.getValue();
    this.valid = await this.isValid();
    this.values = { type, ref };
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
          inputId="tcs-structure-form-type"
          inputName="tcs-structure-form-type"
          placeholder="Type"
          onSelectChange={onChange.bind(this)}
          entries={[
            { id: 'part', label: 'Part' },
            { id: 'chapter', label: 'Chapter' },
            { id: 'anonymous-block', label: 'Anonymous block' },
          ]}
        />
        <tcs-textfield
          ref={el => this.textfieldRef = el}
          required
          inputId="tcs-structure-form-ref"
          inputName="tcs-structure-form-ref"
          placeholder="Ref"
          type="text"
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
