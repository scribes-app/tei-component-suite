import { Component, Host, h } from '@stencil/core';
import { Element, Event, EventEmitter, Fragment, JSX, Prop, State, Watch } from '@stencil/core/internal';
import classNames from 'classnames';
import { Punctuations, isEqual } from '../../lib/helper';
import { EditorToolbarConfig, UnionAbbreviationType, UnionDeletedRend, UnionEditorLayoutType, UnionHighlightedRend, UnionReconstructionReason, UnionStructureType, UnionUnclearReason } from '../../lib/types';

@Component({
  tag: 'tcs-editor-toolbar',
  styleUrl: 'tcs-editor-toolbar.scss',
  shadow: true,
})
export class TcsEditorToolbar {

  @Element()
  private element: HTMLElement;

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
  public readonly config: EditorToolbarConfig;

  @Prop()
  public readonly textDirection: 'LTR'|'RTL' = 'LTR';

  @Prop()
  public readonly layoutType: UnionEditorLayoutType = 'columns';

  @Prop()
  public readonly viewRaw: boolean = false;

  @Prop()
  public readonly disabled: boolean = false;

  @Prop()
  public readonly locked: boolean = false;

  @State()
  private display: 'slim'|'default' = 'default';

  @Watch('config')
  public watchConfig(next: EditorToolbarConfig, prev: EditorToolbarConfig): void {
    if (!isEqual(next, prev)) this.initConfig();
  }

  componentDidLoad(): void {
    this.initConfig();
    this.initObserver();
  }

  private initConfig(): void {
    // Do something with the config
  }

  private initObserver(): void {
    const observer = new ResizeObserver(this.handleResize.bind(this));
    observer.observe(this.element);
  }

  private handleResize(): void {
    this.display = this.element.clientWidth < 1050 ? 'slim' : 'default';
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
      config,
      display
    } = this;
    return (
      <Host
        class={classNames({
          disabled
        })}>
        <div class="controls">
          {config.controls.viewRaw && (
            <tcs-button
              active={viewRaw}
              onClickButton={clickViewRaw.emit.bind(this)}
              iconOnly
              disabled={locked}
              icon="code-simple"
            />
          )}
          {config.controls.remove && (
            <tcs-button
              active={viewRaw}
              onClickButton={clickRemove.emit.bind(this)}
              iconOnly
              icon="broom"
              disabled={viewRaw || locked}
            />
          )}
          {config.controls.textDirection && (
            <Fragment>
              <tcs-button
                active={textDirection === 'LTR'}
                onClickButton={clickLTR.emit.bind(this)}
                iconOnly
                icon="paragraph-ltr"
                disabled={viewRaw || locked}
              />
              <tcs-button
                active={textDirection === 'RTL'}
                onClickButton={clickRTL.emit.bind(this)}
                iconOnly
                icon="paragraph-rtl"
                disabled={viewRaw || locked}
              />
            </Fragment>
          )}
          {config.controls.blankSpace && (
            <tcs-button
              onClickButton={clickBlankSpace.emit.bind(this)}
              iconOnly
              icon="white-space"
              disabled={viewRaw || locked}
            />
            )}
          {config.controls.structure && (
            <tcs-button
              display={display}
              slimText="Struc"
              onClickButton={clickStructure.emit.bind(this)}
              disabled={viewRaw || locked}>
              Structure
            </tcs-button>
          )}
          {config.controls.annotation && (
            <tcs-button
              display={display}
              slimText="Ann"
              onClickButton={clickAnnotation.emit.bind(this)}
              disabled={viewRaw || locked}>
              Annotation
            </tcs-button>
          )}
          {config.controls.reconstruction && (
            <tcs-dropdown
              display={display}
              slimText="Rec"
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
            <tcs-dropdown
              display={display}
              slimText="Unc"
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
            <tcs-dropdown
              display={display}
              slimText="High"
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
            <tcs-dropdown
              display={display}
              slimText="Del"
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
            <tcs-dropdown
              display={display}
              slimText="Abbr"
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
            <tcs-dropdown
              display={display}
              slimText="Punc"
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
            <tcs-icon icon={locked ? 'lock' : 'unlock'} />
            {config.controls.settings && (
              <tcs-button
                onClickButton={clickTextSize.emit.bind(this)}
                iconOnly
                icon="text-size"
                disabled={locked}
              />
            )}
            {config.controls.settings && (
              <tcs-button
                onClickButton={clickSettings.emit.bind(this)}
                iconOnly
                icon="settings"
                disabled={locked}
              />
            )}
            {config.controls.layout && (
              <tcs-button
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
