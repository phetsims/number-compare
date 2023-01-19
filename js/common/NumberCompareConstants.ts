// Copyright 2023, University of Colorado Boulder

/**
 * Constants defined for this simulation.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import numberCompare from '../numberCompare.js';

const NumberCompareConstants = {

  // RequireJS namespace, used for looking up translated strings
  NUMBER_COMPARE_REQUIREJS_NAMESPACE: 'NUMBER_COMPARE',

  // default value for the maximum sum on the 'Compare' screen, see NumberCompareQueryParameters
  COMPARE_MAX_DEFAULT: 20
};

numberCompare.register( 'NumberCompareConstants', NumberCompareConstants );
export default NumberCompareConstants;