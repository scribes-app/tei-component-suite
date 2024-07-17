import { Component, Event, EventEmitter, Host, Method, State, h } from '@stencil/core';
import { XecAnnotationFormValues } from '../../../lib/types';

@Component({
  tag: 'xec-annotation-form',
  styleUrl: 'xec-annotation-form.scss',
  shadow: true,
})
export class XecAnnotationForm {

  private fieldRefs: Map<keyof XecAnnotationFormValues, HTMLXecSelectElement> = new Map([
    ['type', undefined],
    ['rend', undefined],
    ['hand', undefined]
  ]);

  @Event()
  public formChange: EventEmitter<XecAnnotationFormValues>;

  @Event()
  public formSubmit: EventEmitter<XecAnnotationFormValues>;

  @State()
  private valid: boolean = false;

  @State()
  private values: XecAnnotationFormValues = {
    type: undefined,
    rend: undefined,
    hand: undefined
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

  private async onChange(field: keyof XecAnnotationFormValues): Promise<void> {
    // @ts-ignore not compatible with the current types
    this.values[field] = await this.fieldRefs.get(field).getValue() as string;
    this.formChange.emit(this.values);
  }

  render() {
    const {
      onChange,
      onSubmit,
      valid
    } = this;
    return (
      <Host>
        <xec-select
          ref={el => this.fieldRefs.set('type', el)}
          required
          inputId="xec-annotation-form-type"
          inputName="xec-annotation-form-type"
          placeholder="Type"
          onSelectChange={onChange.bind(this, 'type')}
          entries={[
            { label: 'Top Margin', id: 'top_margin' },
            { label: 'Bottom Margin', id: 'bottom_margin' },
            { label: 'Left Margin', id: 'left_margin' },
            { label: 'Right Margin', id: 'right_margin' },
            { label: 'Interlinear', id: 'interlinear' },
            { label: 'Infra-linear', id: 'infra-linear' },
            { label: 'Supralinear', id: 'supralinear' },
            { label: 'Ketiv Qere', id: 'ketiv_qere' }
          ]}
        />
        <xec-select
          ref={el => this.fieldRefs.set('rend', el)}
          required
          inputId="xec-annotation-form-rend"
          inputName="xec-annotation-form-rend"
          placeholder="Rend"
          onSelectChange={onChange.bind(this, 'rend')}
          entries={[
            { label: 'Oblique', id: 'oblique' },
            { label: 'Vertical', id: 'vertical' },
            { label: 'Align Left', id: 'align_left' },
            { label: 'Align Center', id: 'align_center' },
            { label: 'Align Right', id: 'align_right' }
          ]}
        />
        <xec-select
          ref={el => this.fieldRefs.set('hand', el)}
          required
          inputId="xec-annotation-form-hand"
          inputName="xec-annotation-form-hand"
          placeholder="Hand"
          onSelectChange={onChange.bind(this, 'hand')}
          entries={[
            { label: 'Main Scribe', id: 'main_scribe' },
            { label: 'Scribe A', id: 'scribe_a' },
            { label: 'Scribe B', id: 'scribe_b' },
            { label: 'Scribe C', id: 'scribe_c' },
            { label: 'Scribe D', id: 'scribe_d' }
          ]}
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
