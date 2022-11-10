// Copyright 2022, University of Colorado Boulder

/**
 * A singleton UtteranceQueue that is used for voicing specific to Number Compare. This is needed because Number Compare
 * doesn't have the Voicing feature, but still needs to use speech synthesis.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import UtteranceQueue from '../../../../utterance-queue/js/UtteranceQueue.js';
import numberCompare from '../../numberCompare.js';
import numberCompareSpeechSynthesisAnnouncer from './numberCompareSpeechSynthesisAnnouncer.js';

const numberCompareUtteranceQueue = new UtteranceQueue( numberCompareSpeechSynthesisAnnouncer );

numberCompare.register( 'numberCompareUtteranceQueue', numberCompareUtteranceQueue );
export default numberCompareUtteranceQueue;