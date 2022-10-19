// Copyright 2022, University of Colorado Boulder

/**
 * NumberComparePreferencesNode is the user interface for sim-specific preferences for Number Compare, accessed via the
 * Preferences dialog. These preferences are global, and affect all screens.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import { HBox, Text } from '../../../../scenery/js/imports.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Utils from '../../../../dot/js/Utils.js';
import numberCompare from '../../numberCompare.js';
import numberComparePreferences, { NumberComparePreferences } from '../model/numberComparePreferences.js';
import NumberSuiteCommonPreferencesNode from '../../../../number-play/js/common/view/NumberSuiteCommonPreferencesNode.js';
import NumberCompareStrings from '../../NumberCompareStrings.js';

export default class NumberComparePreferencesNode extends NumberSuiteCommonPreferencesNode<NumberComparePreferences> {

  public constructor() {

    const compareMaxText = new Text( NumberCompareStrings.maximumTotalStringProperty,
      NumberSuiteCommonPreferencesNode.CONTROL_TEXT_OPTIONS );
    const compareMaxSlider = new HSlider( numberComparePreferences.compareMaxProperty,
      numberComparePreferences.compareMaxProperty.range!, {
        constrainValue: ( value: number ) => Utils.toFixedNumber( value, 1 )
      } );
    const compareMaxControl = new HBox( {
      children: [ compareMaxText, compareMaxSlider ]
    } );

    super( numberComparePreferences, [ compareMaxControl ] );
  }
}

numberCompare.register( 'NumberComparePreferencesNode', NumberComparePreferencesNode );