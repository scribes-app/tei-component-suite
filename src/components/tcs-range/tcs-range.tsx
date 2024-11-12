import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'tcs-range',
  styleUrl: 'tcs-range.scss',
  shadow: true
})
export class TcsRange {

  private debounceTimeout: any | null = null;

  private trackRef!: HTMLElement;

  @Event()
  public readonly rangeChange: EventEmitter<number>;

  @Prop()
  public readonly min: number = 0;

  @Prop()
  public readonly max: number = 100;

  @Prop()
  public readonly showRangeMin: boolean = false;

  @Prop()
  public readonly showRangeMax: boolean = false;

  @Prop()
  public readonly readOnly?: boolean = false;

  @Prop()
  public readonly defaultValue?: number;

  @Prop()
  public readonly precision: number;

  @Prop()
  public readonly debounce?: number;

  @Prop()
  public readonly stylesOverride?: string;

  @State()
  private value: number;

  @State()
  private isDragging: boolean = false;

  constructor() {
    this.value = this.defaultValue ?? this.min;
  }

  @Method()
  async reset(): Promise<void> {
    const value = this.defaultValue ?? this.min;
    this.value = value;
  }

  get left(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private computedRange(): { clientXMin: number, clientXMax: number } {
    const track = this.trackRef;
    if (!track) return { clientXMin: 0, clientXMax: 0 };
    const rect = track.getBoundingClientRect();
    return { clientXMin: rect.left, clientXMax: rect.left + rect.width };
  }

  private onDragStart(_: MouseEvent): void {
    this.isDragging = true;
  }

  private onDragEnd(_: MouseEvent): void {
    this.isDragging = false;
  }

  private emitChange(value: number) {
    const { rangeChange, precision, debounce } = this;
    if (debounce) {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        const roundedValue = precision ? Number(value.toFixed(precision)) : value;
        rangeChange.emit(roundedValue);
      }, debounce);
    } else {
      const roundedValue = precision ? Number(value.toFixed(precision)) : value;
      rangeChange.emit(roundedValue);
    }
  }

  private onDrag(event: MouseEvent): void {
    const { clientX } = event;
    const { clientXMin, clientXMax } = this.computedRange();
    if (clientX < clientXMin) return this.updateValue(this.min);
    if (clientX > clientXMax) return this.updateValue(this.max);
    const value = ((clientX - clientXMin) / (clientXMax - clientXMin)) * (this.max - this.min) + this.min;
    this.updateValue(value);
  }

  private updateValue(value: number): void {
    this.value = value;
    this.emitChange(value);
  }

  render() {
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      left,
      readOnly,
      min,
      max,
      precision,
      stylesOverride,
      isDragging,
      showRangeMax,
      showRangeMin
    } = this;
    return (
      <Host class={classNames({
        readOnly: readOnly,
        showRangeMin: showRangeMin,
        showRangeMax: showRangeMax,
        [stylesOverride ?? '']: !!stylesOverride
      })}>
        {showRangeMin && <div class="min">{min.toFixed(precision)}</div>}
        <div class="track" ref={(el) => this.trackRef = el}>
          <div
            class={classNames({
              'thumb': true,
              'active': isDragging
            })}
            style={{ left: `${left}%` }}
          >
            <div class={classNames({
              'value': true,
              'active': isDragging
            })}>{this.value.toFixed(precision)}</div>
          </div>
          <div
            onDrag={onDrag.bind(this)}
            onDragStart={onDragStart.bind(this)}
            onDragEnd={onDragEnd.bind(this)}
            draggable={true}
            style={{ left: `${left}%` }}
            class="shadowThumb"
          />
        </div>
        {showRangeMax && <div class="max">{max.toFixed(precision)}</div>}
      </Host>
    );
  }
}
