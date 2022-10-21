// Copyright 2022, University of Colorado Boulder

/**
 * NumberComparePreferencesNode is the user interface for sim-specific preferences for Number Compare, accessed via the
 * Preferences dialog. These preferences are global, and affect all screens.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import { Font, HBox, Text, VBox } from '../../../../scenery/js/imports.js';
import Range from '../../../../dot/js/Range.js';
import numberCompare from '../../numberCompare.js';
import numberComparePreferences, { NumberComparePreferences } from '../model/numberComparePreferences.js';
import NumberSuiteCommonPreferencesNode from '../../../../number-play/js/common/view/NumberSuiteCommonPreferencesNode.js';
import NumberCompareStrings from '../../NumberCompareStrings.js';
import Property from '../../../../axon/js/Property.js';
import NumberSpinner from '../../../../sun/js/NumberSpinner.js';
import NumberPlayConstants from '../../../../number-play/js/common/NumberPlayConstants.js';

export default class NumberComparePreferencesNode extends NumberSuiteCommonPreferencesNode<NumberComparePreferences> {

  public constructor() {

    // TODO: factor out type with subitize time control if kept
    const compareMaxText = new Text( NumberCompareStrings.maximumTotalStringProperty,
      NumberSuiteCommonPreferencesNode.CONTROL_TEXT_BOLD_OPTIONS );
    const compareMaxSpinner = new NumberSpinner( numberComparePreferences.compareMaxProperty,
      new Property<Range>( new Range( 1, NumberPlayConstants.TWENTY ) ), {
        arrowsPosition: 'leftRight',
        deltaValue: 1,
        numberDisplayOptions: {
          valuePattern: '{{value}}',
          decimalPlaces: 0,
          align: 'center',
          xMargin: 10,
          yMargin: 3,
          textOptions: {
            font: new Font( { size: NumberSuiteCommonPreferencesNode.FONT_SIZE } )
          }
        }
      } );
    const compareMaxHBox = new HBox( {
      children: [ compareMaxText, compareMaxSpinner ],
      spacing: 105
    } );

    const compareMaxDescriptionText = new Text( 'Set the largest number that can be compared.',
      NumberSuiteCommonPreferencesNode.CONTROL_TEXT_OPTIONS );
    const compareMaxControl = new VBox( {
      children: [ compareMaxHBox, compareMaxDescriptionText ],
      spacing: NumberSuiteCommonPreferencesNode.CONTROL_DESCRIPTION_SPACING,
      align: 'left'
    } );

    super( numberComparePreferences, [ compareMaxControl ] );

    // disable any controls that are not applicable to the current selection of screens
    if ( QueryStringMachine.containsKey( 'screens' ) ) {
      const screens = phet.chipper.queryParameters.screens;
      const isSecondLocaleScreen = screens.includes( 1 );
      const isCompareScreen = screens.includes( 1 );
      const isLabScreen = screens.includes( 2 );

      this.readAloudToggleSwitch.enabled = isSecondLocaleScreen;
      this.showSecondLocaleControl.enabled = isSecondLocaleScreen;
      compareMaxControl.enabled = isCompareScreen;
      this.showLabOnesToggleSwitch.enabled = isLabScreen;
    }
  }
}

numberCompare.register( 'NumberComparePreferencesNode', NumberComparePreferencesNode );