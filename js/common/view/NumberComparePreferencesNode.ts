// Copyright 2022-2023, University of Colorado Boulder

/**
 * NumberComparePreferencesNode is the user interface for sim-specific preferences for Number Compare, accessed via the
 * Preferences dialog. These preferences are global, and affect all screens.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import numberCompare from '../../numberCompare.js';
import numberComparePreferences from '../model/numberComparePreferences.js';
import NumberSuiteCommonPreferencesNode from '../../../../number-suite-common/js/common/view/NumberSuiteCommonPreferencesNode.js';
import NumberSuiteCommonPreferences from '../../../../number-suite-common/js/common/model/NumberSuiteCommonPreferences.js';

export default class NumberComparePreferencesNode extends NumberSuiteCommonPreferencesNode<NumberSuiteCommonPreferences> {

  public constructor() {

    super( numberComparePreferences, [] );

    // disable any controls that are not applicable to the current selection of screens
    if ( QueryStringMachine.containsKey( 'screens' ) ) {
      const screens = phet.chipper.queryParameters.screens;
      const isSecondLocaleScreen = screens.includes( 1 );
      const isLabScreen = screens.includes( 2 );

      this.showSecondLocaleControl.enabled = isSecondLocaleScreen;
      this.showLabOnesControl.enabled = isLabScreen;
    }
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

numberCompare.register( 'NumberComparePreferencesNode', NumberComparePreferencesNode );