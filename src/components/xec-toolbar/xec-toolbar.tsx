import { Component, Host, h } from '@stencil/core';
import { Event, EventEmitter, Fragment, JSX, Prop, Watch } from '@stencil/core/internal';
import classNames from 'classnames';
import { isEqual } from '../../lib/helper';
import { ToolbarConfig, UnionDeletedReason, UnionHighlightedReason, UnionUnclearReason } from '../../lib/types';

@Component({
  tag: 'xec-toolbar',
  styleUrl: 'xec-toolbar.scss',
  shadow: true,
})
export class XecToolbar {

  @Event()
  private readonly clickViewRaw: EventEmitter<void>;

  @Event()
  private readonly clickViewXML: EventEmitter<void>;

  @Event()
  private readonly clickUnclear: EventEmitter<UnionUnclearReason>;

  @Event()
  private readonly clickHighlighted: EventEmitter<UnionHighlightedReason>;

  @Event()
  private readonly clickDeleted: EventEmitter<UnionDeletedReason>;

  @Event()
  private readonly clickRTL: EventEmitter<void>;

  @Event()
  private readonly clickLTR: EventEmitter<void>;

  @Prop()
  public readonly config: ToolbarConfig;

  @Prop()
  public readonly textDirection: 'LTR'|'RTL' = 'LTR';

  @Prop()
  public readonly viewRaw: boolean = false;

  @Prop()
  public readonly disabled: boolean = false;

  @Watch('config')
  public watchConfig(next: ToolbarConfig, prev: ToolbarConfig): void {
    if (!isEqual(next, prev)) this.initConfig();
  }

  private initConfig(): void {
    // Do something with the config
  }

  public render(): JSX.Element {
    const {
      clickViewRaw,
      clickRTL,
      clickLTR,
      clickViewXML,
      clickUnclear,
      clickHighlighted,
      clickDeleted,
      textDirection,
      viewRaw,
      disabled,
      config
    } = this;
    return (
      <Host
        class={classNames({
          disabled
        })}>
        <div class="controls">
          {config.controls.viewRaw && (
            <xec-button active={viewRaw} onClickButton={clickViewRaw.emit.bind(this)} iconOnly icon="code-simple" />
          )}
          {config.controls.textDirection && (
            <Fragment>
              <xec-button active={textDirection === 'LTR'} onClickButton={clickLTR.emit.bind(this)} iconOnly icon="align-left" />
              <xec-button active={textDirection === 'RTL'} onClickButton={clickRTL.emit.bind(this)} iconOnly icon="align-right" />
            </Fragment>
          )}
          {config.controls.unclear && (
            <xec-dropdown
              config={{
                label: 'Unclear',
                items: [
                  {
                    id: 'legible_incomplete',
                    label: 'Legible incomplete',
                    onClick: clickUnclear.emit.bind(this, 'legible_incomplete')
                  },
                  {
                    id: 'uncertain',
                    label: 'Uncertain',
                    onClick: clickUnclear.emit.bind(this, 'uncertain')
                  },
                  {
                    id: 'faded',
                    label: 'Faded',
                    onClick: clickUnclear.emit.bind(this, 'faded')
                  },
                  {
                    id: 'background_noise',
                    label: 'Background noise',
                    onClick: clickUnclear.emit.bind(this, 'background_noise')
                  }
                ]
              }}
            />
          )}
          {config.controls.highlighted && (
            <xec-dropdown
              config={{
                label: 'Highlighted',
                items: [
                  {
                    id: 'enlarged',
                    label: 'Enlarged',
                    onClick: clickHighlighted.emit.bind(this, 'enlarged')
                  },
                  {
                    id: 'displaced-above',
                    label: 'Displaced above',
                    onClick: clickHighlighted.emit.bind(this, 'displaced-above')
                  },
                  {
                    id: 'displaced-below',
                    label: 'Displaced below',
                    onClick: clickHighlighted.emit.bind(this, 'displaced-below')
                  },
                  {
                    id: 'supralinear',
                    label: 'Supralinear',
                    onClick: clickHighlighted.emit.bind(this, 'supralinear')
                  },
                  {
                    id: 'infralinear',
                    label: 'Infralinear',
                    onClick: clickHighlighted.emit.bind(this, 'infralinear')
                  },
                  {
                    id: 'doted',
                    label: 'Doted',
                    onClick: clickHighlighted.emit.bind(this, 'doted')
                  },
                  {
                    id: 'bigger',
                    label: 'Bigger',
                    onClick: clickHighlighted.emit.bind(this, 'bigger')
                  }
                ]
              }}
            />
          )}
          {config.controls.deleted && (
            <xec-dropdown
              config={{
                label: 'Deleted',
                items: [
                  {
                    id: 'erased',
                    label: 'Erased',
                    onClick: clickDeleted.emit.bind(this, 'erased')
                  },
                  {
                    id: 'strikethrough',
                    label: 'Strikethrough',
                    onClick: clickDeleted.emit.bind(this, 'strikethrough')
                  },
                  {
                    id: 'dotted',
                    label: 'Dotted',
                    onClick: clickDeleted.emit.bind(this, 'dotted')
                  },
                  {
                    id: 'underline',
                    label: 'Underline',
                    onClick: clickDeleted.emit.bind(this, 'underline')
                  },
                  {
                    id: 'other',
                    label: 'Other',
                    onClick: clickDeleted.emit.bind(this, 'other')
                  }
                ]
              }}
            />
          )}
          {config.controls.viewXML && (
            <xec-button onClickButton={clickViewXML.emit.bind(this)}>
              View XML
            </xec-button>
          )}
        </div>
      </Host>
    );
  }

}
