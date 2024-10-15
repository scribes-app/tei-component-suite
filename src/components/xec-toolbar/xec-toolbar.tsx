import { Component, Host, h } from '@stencil/core';
import { Event, EventEmitter, Fragment, JSX, Prop, Watch } from '@stencil/core/internal';
import classNames from 'classnames';
import { Punctuations, isEqual } from '../../lib/helper';
import { ToolbarConfig, UnionAbbreviationType, UnionDeletedRend, UnionHighlightedRend, UnionLayoutType, UnionReconstructionReason, UnionStructureType, UnionUnclearReason } from '../../lib/types';

@Component({
  tag: 'xec-toolbar',
  styleUrl: 'xec-toolbar.scss',
  shadow: true,
})
export class XecToolbar {

  @Event()
  private readonly clickViewRaw: EventEmitter<void>;

  @Event()
  private readonly clickUnclear: EventEmitter<UnionUnclearReason>;

  @Event()
  private readonly clickReconstruction: EventEmitter<UnionReconstructionReason>;

  @Event()
  private readonly clickAnnotation: EventEmitter<void>;

  @Event()
  private readonly clickHighlighted: EventEmitter<UnionHighlightedRend>;

  @Event()
  private readonly clickDeleted: EventEmitter<UnionDeletedRend>;

  @Event()
  private readonly clickAbbreviation: EventEmitter<UnionAbbreviationType>;

  @Event()
  private readonly clickPunctuation: EventEmitter<string>;

  @Event()
  private readonly clickStructure: EventEmitter<UnionStructureType|'anonymous-block'>;

  @Event()
  private readonly clickBlankSpace: EventEmitter<void>;

  @Event()
  private readonly clickRTL: EventEmitter<void>;

  @Event()
  private readonly clickLTR: EventEmitter<void>;

  @Event()
  private readonly clickTextSize: EventEmitter<void>;

  @Event()
  private readonly clickLayout: EventEmitter<void>;

  @Event()
  private readonly clickRemove: EventEmitter<void>;

  @Event()
  private readonly clickSettings: EventEmitter<void>;

  @Prop()
  public readonly config: ToolbarConfig;

  @Prop()
  public readonly textDirection: 'LTR'|'RTL' = 'LTR';

  @Prop()
  public readonly layoutType: UnionLayoutType = 'columns';

  @Prop()
  public readonly viewRaw: boolean = false;

  @Prop()
  public readonly disabled: boolean = false;

  @Prop()
  public readonly locked: boolean = false;

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
      clickLayout,
      clickRTL,
      clickLTR,
      clickUnclear,
      clickHighlighted,
      clickDeleted,
      clickAbbreviation,
      clickBlankSpace,
      clickPunctuation,
      clickStructure,
      clickRemove,
      clickSettings,
      clickAnnotation,
      clickReconstruction,
      clickTextSize,
      textDirection,
      layoutType,
      viewRaw,
      locked,
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
            <xec-button
              active={viewRaw}
              onClickButton={clickViewRaw.emit.bind(this)}
              iconOnly
              disabled={locked}
              icon="code-simple"
            />
          )}
          {config.controls.remove && (
            <xec-button
              active={viewRaw}
              onClickButton={clickRemove.emit.bind(this)}
              iconOnly
              icon="broom"
              disabled={viewRaw || locked}
            />
          )}
          {config.controls.textDirection && (
            <Fragment>
              <xec-button
                active={textDirection === 'LTR'}
                onClickButton={clickLTR.emit.bind(this)}
                iconOnly
                icon="paragraph-ltr"
                disabled={viewRaw || locked}
              />
              <xec-button
                active={textDirection === 'RTL'}
                onClickButton={clickRTL.emit.bind(this)}
                iconOnly
                icon="paragraph-rtl"
                disabled={viewRaw || locked}
              />
            </Fragment>
          )}
          {config.controls.blankSpace && (
            <xec-button
              onClickButton={clickBlankSpace.emit.bind(this)}
              iconOnly
              icon="white-space"
              disabled={viewRaw || locked}
            />
            )}
          {config.controls.structure && (
            <xec-button
              onClickButton={clickStructure.emit.bind(this)}
              disabled={viewRaw || locked}>
              Structure
            </xec-button>
          )}
          {config.controls.annotation && (
            <xec-button
              onClickButton={clickAnnotation.emit.bind(this)}
              disabled={viewRaw || locked}>
              Annotation
            </xec-button>
          )}
          {config.controls.reconstruction && (
            <xec-dropdown
              disabled={viewRaw || locked}
              config={{
                label: 'Reconstruction',
                items: [
                  {
                    id: 'lacuna',
                    label: 'Lacuna',
                    onClick: clickReconstruction.emit.bind(this, 'lacuna')
                  },
                  {
                    id: 'illegible',
                    label: 'Illegible',
                    onClick: clickReconstruction.emit.bind(this, 'illegible')
                  },
                  {
                    id: 'unspecified',
                    label: 'Unspecified',
                    onClick: clickReconstruction.emit.bind(this, 'unspecified')
                  }
                ]
              }}
            />
          )}
          {config.controls.unclear && (
            <xec-dropdown
              disabled={viewRaw || locked}
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
              disabled={viewRaw || locked}
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
              disabled={viewRaw || locked}
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
          {config.controls.abbreviation && (
            <xec-dropdown
              disabled={viewRaw || locked}
              config={{
                label: 'Abbreviation',
                items: [
                  {
                    id: 'nomSac',
                    label: 'Nom. sac.',
                    onClick: clickAbbreviation.emit.bind(this, 'nomSac')
                  },
                  {
                    id: 'other',
                    label: 'Other',
                    onClick: clickAbbreviation.emit.bind(this, 'other')
                  }
                ]
              }}
            />
          )}
          {config.controls.punctuation && (
            <xec-dropdown
              disabled={viewRaw || locked}
              config={{
                label: 'Punctuation',
                items: Punctuations.map(punctuation => ({
                  id: punctuation,
                  label: punctuation,
                  onClick: clickPunctuation.emit.bind(this, punctuation)
                }))
              }}
            />
          )}
          <div class="alignRight">
            <xec-icon icon={locked ? 'lock' : 'unlock'} />
            {config.controls.settings && (
              <xec-button
                onClickButton={clickTextSize.emit.bind(this)}
                iconOnly
                icon="text-size"
                disabled={locked}
              />
            )}
            {config.controls.settings && (
              <xec-button
                onClickButton={clickSettings.emit.bind(this)}
                iconOnly
                icon="settings"
                disabled={locked}
              />
            )}
            {config.controls.layout && (
              <xec-button
                onClickButton={clickLayout.emit.bind(this)}
                iconOnly
                active={layoutType === 'columns'}
                icon="columns"
                disabled={locked}
              />
            )}
          </div>
        </div>
      </Host>
    );
  }

}
