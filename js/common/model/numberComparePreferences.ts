// Copyright 2022, University of Colorado Boulder

/**
 * NumberComparePreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import NumberPlayQueryParameters from '../../../../number-play/js/common/NumberPlayQueryParameters.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import numberCompare from '../../numberCompare.js';
import NumberSuiteCommonPreferences from '../../../../number-play/js/common/model/NumberSuiteCommonPreferences.js';
import NumberPlayConstants from '../../../../number-play/js/common/NumberPlayConstants.js';

export class NumberComparePreferences extends NumberSuiteCommonPreferences {
  public readonly compareMaxProperty: NumberProperty;

  public constructor() {
    super();

    this.compareMaxProperty = new NumberProperty( NumberPlayQueryParameters.compareMax, {
      range: new Range( 0, NumberPlayConstants.TWENTY )
    } );
  }
}

const numberPlayPreferences = new NumberComparePreferences();
numberCompare.register( 'numberPlayPreferences', numberPlayPreferences );
export default numberPlayPreferences;