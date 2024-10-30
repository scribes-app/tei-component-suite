import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';
import { TcsSettingsFormValues } from '../../../lib/types';

@Component({
  tag: 'tcs-settings-form',
  styleUrl: 'tcs-settings-form.scss',
  shadow: true,
})
export class TcsSettingsForm {

  private fieldRefs: Map<keyof TcsSettingsFormValues, HTMLTcsTextfieldElement> = new Map([
    ['column', undefined],
    ['folio', undefined],
    ['book', undefined]
  ]);

  @Event()
  public formChange: EventEmitter<TcsSettingsFormValues>;

  @Event()
  public formSubmit: EventEmitter<TcsSettingsFormValues>;

  @Prop()
  public readonly defaultValues: TcsSettingsFormValues;

  @State()
  private valid: boolean = false;

  @State()
  private values: TcsSettingsFormValues = {
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

  private async onChange(field: keyof TcsSettingsFormValues): Promise<void> {
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
        <tcs-textfield
          ref={el => this.fieldRefs.set('book', el)}
          required
          inputId="tcs-settings-form-book"
          inputName="tcs-settings-form-book"
          placeholder="Book"
          defaultValue={defaultValues.book}
          type="text"
          onTextfieldChange={onChange.bind(this, 'book')}
        />
        <tcs-textfield
          ref={el => this.fieldRefs.set('column', el)}
          required
          inputId="tcs-settings-form-column"
          inputName="tcs-settings-form-column"
          placeholder="Column"
          defaultValue={defaultValues.column}
          type="text"
          onTextfieldChange={onChange.bind(this, 'column')}
        />
        <tcs-textfield
          ref={el => this.fieldRefs.set('folio', el)}
          required
          inputId="tcs-settings-form-folio"
          inputName="tcs-settings-form-folio"
          placeholder="Folio"
          defaultValue={defaultValues.folio}
          type="text"
          onTextfieldChange={onChange.bind(this, 'folio')}
        />
        <tcs-button
          outlined
          rounded
          disabled={!valid}
          onClickButton={onSubmit.bind(this)}
          >
          Save
        </tcs-button>
      </Host>
    );
  }

}
