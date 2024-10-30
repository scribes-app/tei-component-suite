import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { UnionIcons } from '../../lib/types';
import { JSX } from '@stencil/core/internal';

@Component({
  tag: 'tcs-icon',
  styleUrl: 'tcs-icon.scss',
  shadow: true,
})
export class TcsIcon {

  @Event()
  private readonly clickIcon: EventEmitter<SVGElement>;

  @Prop()
  public readonly viewBox?: string;
  @Prop()
  public readonly library?: string;
  @Prop()
  public readonly icon: UnionIcons;

  /**
   * Handle click on icon
   */
  private onClickIcon(): void {
    this.clickIcon.emit();
  }

  /**
   * Get the path to the symbols file
   * @usage The path can be set with the library prop or in the globalThis.TcsConfig.symbolsPath
   */
  private getSymbolsPath(): string {
    return `${this.library ?? globalThis.TcsConfig?.symbolsPath ?? ''}`;
  }

  public render(): JSX.Element {
    const {
      onClickIcon,
      icon,
      viewBox
    } = this;
    return (
      <svg
        onClick={onClickIcon.bind(this)}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox={viewBox ?? undefined}>
        <use
          href={`${this.getSymbolsPath()}#icon-${icon}`}
          xlinkHref={`${this.getSymbolsPath()}#icon-${icon}`} width="100%" height="100%"
        />
      </svg>
    )
  }

}
