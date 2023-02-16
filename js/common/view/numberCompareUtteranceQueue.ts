// Copyright 2022-2023, University of Colorado Boulder

/**
 * A singleton UtteranceQueue that is used for voicing specific to Number Compare. This is needed because Number Compare
 * doesn't have the Voicing feature, but still needs to use speech synthesis.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import TProperty from '../../../../axon/js/TProperty.js';
import NumberSuiteCommonUtteranceQueue from '../../../../number-suite-common/js/common/view/NumberSuiteCommonUtteranceQueue.js';
import numberCompare from '../../numberCompare.js';
import numberCompareSpeechSynthesisAnnouncer from './numberCompareSpeechSynthesisAnnouncer.js';
import CompareScreen from '../../compare/CompareScreen.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import numberComparePreferences from '../model/numberComparePreferences.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Screen from '../../../../joist/js/Screen.js';

class NumberCompareUtteranceQueue extends NumberSuiteCommonUtteranceQueue {

  public readonly compareScreenSpeechDataProperty: TProperty<string | null>;

  public constructor() {
    super( numberCompareSpeechSynthesisAnnouncer, numberComparePreferences.readAloudProperty );

    this.compareScreenSpeechDataProperty = new Property<string | null>( null );
  }

  /**
   * Starts the initialization process by using the provided selectedScreenProperty to determine which speechData
   * to use for a given screen that the user is viewing. This is needed because selectedScreenProperty doesn't exist
   * yet during the creation of this singleton.
   */
  public initialize( selectedScreenProperty: TReadOnlyProperty<Screen> ): void {

    const speechDataProperty = new DerivedProperty(
      [ this.compareScreenSpeechDataProperty, selectedScreenProperty ], ( compareScreenSpeechData, selectedScreen ) => {

        // We want the speech data to reflect the selected screen. Returns null for screens that do not support speech synthesis.
        return selectedScreen instanceof CompareScreen ? compareScreenSpeechData : null;
      } );

    this.initializeNumberSuiteCommonUtteranceQueue( speechDataProperty );
  }
}

const numberCompareUtteranceQueue = new NumberCompareUtteranceQueue();

numberCompare.register( 'numberCompareUtteranceQueue', numberCompareUtteranceQueue );
export default numberCompareUtteranceQueue;