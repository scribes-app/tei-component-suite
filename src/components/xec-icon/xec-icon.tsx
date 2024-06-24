import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { UnionIcons } from '../../lib/types';
import { JSX } from '@stencil/core/internal';

@Component({
  tag: 'xec-icon',
  styleUrl: 'xec-icon.scss',
  shadow: true,
})
export class XecIcon {

  @Event()
  public readonly clickIcon: EventEmitter<void>;

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
   * @usage The path can be set with the library prop or in the globalThis.XecConfig.symbolsPath
   */
  private getSymbolsPath(): string {
    return `${this.library ?? globalThis.XecConfig?.symbolsPath ?? ''}/symbols.svg`;
  }

  render(): JSX.Element {
    const { icon, viewBox, onClickIcon } = this;
    return (
      <svg
        onClick={onClickIcon.bind(this)}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox={viewBox ?? undefined}>
        <use
          href={`${this.getSymbolsPath()}#${icon}`}
          xlinkHref={`${this.getSymbolsPath()}#${icon}`} width="100%" height="100%"
        />
      </svg>
    )
  }

}
