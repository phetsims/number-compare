// Copyright 2022, University of Colorado Boulder

/**
 * NumberComparePreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import numberCompare from '../../numberCompare.js';
import NumberSuiteCommonPreferences from '../../../../number-suite-common/js/common/model/NumberSuiteCommonPreferences.js';

const numberComparePreferences = new NumberSuiteCommonPreferences();

numberCompare.register( 'numberComparePreferences', numberComparePreferences );
export default numberComparePreferences;