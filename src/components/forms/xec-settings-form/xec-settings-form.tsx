import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';
import { XecSettingsFormValues } from '../../../lib/types';

@Component({
  tag: 'xec-settings-form',
  styleUrl: 'xec-settings-form.scss',
  shadow: true,
})
export class XecSettingsForm {

  private fieldRefs: Map<keyof XecSettingsFormValues, HTMLXecTextfieldElement> = new Map([
    ['column', undefined],
    ['folio', undefined],
    ['book', undefined]
  ]);

  @Event()
  public formChange: EventEmitter<XecSettingsFormValues>;

  @Event()
  public formSubmit: EventEmitter<XecSettingsFormValues>;

  @Prop()
  public readonly defaultValues: XecSettingsFormValues;

  @State()
  private valid: boolean = false;

  @State()
  private values: XecSettingsFormValues = {
    column: undefined,
    folio: undefined,
    book: undefined
  };

  @Method()
  public async isValid(): Promise<boolean> {
    return true;
  }

  public async componentDidLoad(): Promise<void> {
    this.valid = await this.isValid();
  }

  private async onSubmit(): Promise<void> {
    this.formSubmit.emit(this.values);
  }

  private async onChange(field: keyof XecSettingsFormValues): Promise<void> {
    this.values[field] = await this.fieldRefs.get(field).getValue();
    this.formChange.emit(this.values);
  }

  render() {
    const {
      onChange,
      onSubmit,
      defaultValues,
      valid
    } = this;
    return (
      <Host>
        <xec-textfield
          ref={el => this.fieldRefs.set('book', el)}
          required
          inputId="xec-settings-form-book"
          inputName="xec-settings-form-book"
          placeholder="Book"
          defaultValue={defaultValues.book}
          type="text"
          onTextfieldChange={onChange.bind(this, 'book')}
        />
        <xec-textfield
          ref={el => this.fieldRefs.set('column', el)}
          required
          inputId="xec-settings-form-column"
          inputName="xec-settings-form-column"
          placeholder="Column"
          defaultValue={defaultValues.column}
          type="text"
          onTextfieldChange={onChange.bind(this, 'column')}
        />
        <xec-textfield
          ref={el => this.fieldRefs.set('folio', el)}
          required
          inputId="xec-settings-form-folio"
          inputName="xec-settings-form-folio"
          placeholder="Folio"
          defaultValue={defaultValues.folio}
          type="text"
          onTextfieldChange={onChange.bind(this, 'folio')}
        />
        <xec-button
          outlined
          rounded
          disabled={!valid}
          onClickButton={onSubmit.bind(this)}
          >
          Save
        </xec-button>
      </Host>
    );
  }

}
