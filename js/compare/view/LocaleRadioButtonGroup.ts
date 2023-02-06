// Copyright 2023, University of Colorado Boulder

/**
 * LocaleRadioButtonGroup is a vertical radio-button group for selecting primary vs secondary language.
 * It's an alternative to LocaleSwitch that takes up less horizontal space, and was developed as a workaround
 * for https://github.com/phetsims/number-compare/issues/18.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import localeProperty, { Locale } from '../../../../joist/js/i18n/localeProperty.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import numberSuiteCommon from '../../../../number-suite-common/js/numberSuiteCommon.js';
import { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import localeInfoModule from '../../../../chipper/js/data/localeInfoModule.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

const TEXT_OPTIONS: TextOptions = {
  font: new PhetFont( 14 ),
  maxWidth: 150 // set empirically
};

// Size the radio buttons to match the text height.
const RADIO_BUTTON_RADIUS = new Text( 'X', TEXT_OPTIONS ).height / 2;

export default class LocaleRadioButtonGroup extends VerticalAquaRadioButtonGroup<boolean> {

  public constructor( isPrimaryLocaleProperty: Property<boolean>,
                      showSecondLocaleProperty: TReadOnlyProperty<boolean>,
                      secondLocaleProperty: TReadOnlyProperty<Locale> ) {

    const firstLanguageStringProperty = new DerivedProperty( [ localeProperty ],
      locale => localeInfoModule[ locale ].localizedName );

    const secondLanguageStringProperty = new DerivedProperty( [ secondLocaleProperty ],
      locale => localeInfoModule[ locale ].localizedName );

    const items: AquaRadioButtonGroupItem<boolean>[] = [
      {
        value: true,
        createNode: () => new Text( firstLanguageStringProperty, TEXT_OPTIONS )
      },
      {
        value: false,
        createNode: () => new Text( secondLanguageStringProperty, TEXT_OPTIONS )
      }
    ];

    super( isPrimaryLocaleProperty, items, {
      spacing: 10,
      radioButtonOptions: {
        radius: RADIO_BUTTON_RADIUS
      }
    } );
  }
}

numberSuiteCommon.register( 'LocaleRadioButtonGroup', LocaleRadioButtonGroup );