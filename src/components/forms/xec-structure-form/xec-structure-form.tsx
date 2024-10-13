import { Component, Event, EventEmitter, Host, Method, State, h } from '@stencil/core';
import { UnionStructureType } from '../../../components';
import { XecStructureFormValues } from '../../../lib/types';

@Component({
  tag: 'xec-structure-form',
  styleUrl: 'xec-structure-form.scss',
  shadow: true,
})
export class XecStructureForm {

  private selectRef: HTMLXecSelectElement;
  private textfieldRef: HTMLXecTextfieldElement;

  @Event()
  public formChange: EventEmitter<XecStructureFormValues>;

  @Event()
  public formSubmit: EventEmitter<XecStructureFormValues>;

  @State()
  private valid: boolean = false;

  @State()
  private values: XecStructureFormValues = {
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
        <xec-select
          ref={el => this.selectRef = el}
          required
          inputId="xec-structure-form-type"
          inputName="xec-structure-form-type"
          placeholder="Type"
          onSelectChange={onChange.bind(this)}
          entries={[
            { id: 'part', label: 'Part' },
            { id: 'chapter', label: 'Chapter' },
            { id: 'anonymous-block', label: 'Anonymous block' },
          ]}
        />
        <xec-textfield
          ref={el => this.textfieldRef = el}
          required
          inputId="xec-structure-form-ref"
          inputName="xec-structure-form-ref"
          placeholder="Ref"
          type="text"
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
