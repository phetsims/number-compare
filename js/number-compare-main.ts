// Copyright 2019-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CompareScreen from './compare/CompareScreen.js';
import { Display } from '../../scenery/js/imports.js';
import DerivedProperty from '../../axon/js/DerivedProperty.js';
import audioManager from '../../joist/js/audioManager.js';
import SpeechSynthesisAnnouncer from '../../utterance-queue/js/SpeechSynthesisAnnouncer.js';
import soundManager from '../../tambo/js/soundManager.js';
import NumberCompareStrings from './NumberCompareStrings.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import NumberComparePreferencesNode from './common/view/NumberComparePreferencesNode.js';
import numberComparePreferences from './common/model/numberComparePreferences.js';
import ReadAloudPreferenceControl from '../../number-suite-common/js/common/view/ReadAloudPreferenceControl.js';
import LabScreen from '../../number-suite-common/js/lab/LabScreen.js';
import numberCompareSpeechSynthesisAnnouncer from './common/view/numberCompareSpeechSynthesisAnnouncer.js';

const numberPlayTitleStringProperty = NumberCompareStrings[ 'number-compare' ].titleStringProperty;

const simOptions: SimOptions = {
  credits: {
    //TODO https://github.com/phetsims/number-compare/issues/13 finalize credits
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Klusendorf, Luisa Vargas',
    team: 'Sylvia Celedón-Pattichis, Ariel Paul, Kathy Perkins, Ian Whitacre',
    qualityAssurance: 'Clifford Hardin, Emily Miller, Nancy Salpepi, Kathryn Woessner',
    graphicArts: 'Mariah Hermsmeyer',
    thanks: 'Andrea Barraugh (Math Transformations), Kristin Donley, Bertha Orona'
  },
  preferencesModel: new PreferencesModel( {
    simulationOptions: {
      customPreferences: [ {
        createContent: () => new NumberComparePreferencesNode()
      } ]
    },
    audioOptions: {
      customPreferences: [ {
        createContent: () => new ReadAloudPreferenceControl( numberComparePreferences, numberCompareSpeechSynthesisAnnouncer,
          [ 1 ], NumberCompareStrings.readAloudStringProperty )
      } ]
    }
  } )
};

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {

  const sim = new Sim( numberPlayTitleStringProperty, [
    new CompareScreen( Tandem.ROOT.createTandem( 'compareScreen' ) ),
    new LabScreen( [ '<', '>', '=', '+', '-' ], numberComparePreferences, Tandem.ROOT.createTandem( 'numberCompareLabScreen' ) )
  ], simOptions );
  sim.start();

  soundManager.setOutputLevelForCategory( 'user-interface', 0 );

  // initialize the SpeechSynthesisAnnouncer that will use speech synthesis to speak numbers
  if ( SpeechSynthesisAnnouncer.isSpeechSynthesisSupported() ) {
    numberCompareSpeechSynthesisAnnouncer.initialize( Display.userGestureEmitter, {

      // specify the Properties that control whether or not output is allowed with speech synthesis
      speechAllowedProperty: new DerivedProperty( [
        sim.isConstructionCompleteProperty,
        sim.browserTabVisibleProperty,
        sim.activeProperty,
        sim.isSettingPhetioStateProperty,
        audioManager.audioEnabledProperty
      ], ( simConstructionComplete, simVisible, simActive, simSettingPhetioState, audioEnabled ) => {
        return simConstructionComplete && simVisible && simActive && !simSettingPhetioState && audioEnabled;
      } )
    } );

    numberCompareSpeechSynthesisAnnouncer.enabledProperty.value = true;
  }
} );