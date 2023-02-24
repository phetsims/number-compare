// Copyright 2019-2023, University of Colorado Boulder

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
import ReadAloudControl from '../../number-suite-common/js/common/view/ReadAloudControl.js';
import LabScreen from '../../number-suite-common/js/lab/LabScreen.js';
import numberCompareSpeechSynthesisAnnouncer from './common/view/numberCompareSpeechSynthesisAnnouncer.js';
import NumberSuiteCommonPreferencesNode from '../../number-suite-common/js/common/view/NumberSuiteCommonPreferencesNode.js';
import numberCompareUtteranceQueue from './common/view/numberCompareUtteranceQueue.js';
import LanguageAndVoiceControl from '../../number-suite-common/js/common/view/LanguageAndVoiceControl.js';
import localeProperty from '../../joist/js/i18n/localeProperty.js';
import preferencesSpeechSynthesisAnnouncer from '../../number-suite-common/js/common/view/preferencesSpeechSynthesisAnnouncer.js';

const numberCompareTitleStringProperty = NumberCompareStrings[ 'number-compare' ].titleStringProperty;

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
        createContent: () => new ReadAloudControl(
          numberComparePreferences,
          numberCompareSpeechSynthesisAnnouncer,
          NumberCompareStrings.hearNumberSentenceStringProperty,
          NumberCompareStrings.hearNumberSentenceDescriptionStringProperty,
          NumberSuiteCommonPreferencesNode.hasScreenType( CompareScreen ) )
      } ]
    },
    localizationOptions: {
      includeLocalePanel: false,
      customPreferences: [ {
        createContent: () => new LanguageAndVoiceControl(
          localeProperty,
          numberComparePreferences.primaryVoiceProperty,
          numberCompareSpeechSynthesisAnnouncer
        )
      } ]
    }
  } )
};

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {

  const sim = new Sim( numberCompareTitleStringProperty, [
    new CompareScreen( Tandem.ROOT.createTandem( 'compareScreen' ) ),
    new LabScreen( [ '<', '>', '=', '+', '-' ], numberComparePreferences, Tandem.ROOT.createTandem( 'numberCompareLabScreen' ) )
  ], simOptions );
  sim.start();

  soundManager.setOutputLevelForCategory( 'user-interface', 0 );

  // initialize the SpeechSynthesisAnnouncers that will use speech synthesis for general sim use and setting preferences
  if ( SpeechSynthesisAnnouncer.isSpeechSynthesisSupported() ) {
    const announcerOptions = {

      // specify the Properties that control whether output is allowed with speech synthesis
      speechAllowedProperty: new DerivedProperty( [
        sim.isConstructionCompleteProperty,
        sim.browserTabVisibleProperty,
        sim.activeProperty,
        sim.isSettingPhetioStateProperty,
        audioManager.audioEnabledProperty
      ], ( simConstructionComplete, simVisible, simActive, simSettingPhetioState, audioEnabled ) => {
        return simConstructionComplete && simVisible && simActive && !simSettingPhetioState && audioEnabled;
      } )
    };

    numberCompareSpeechSynthesisAnnouncer.initialize( Display.userGestureEmitter, announcerOptions );
    preferencesSpeechSynthesisAnnouncer.initialize( Display.userGestureEmitter, announcerOptions );

    numberCompareSpeechSynthesisAnnouncer.enabledProperty.value = true;
    preferencesSpeechSynthesisAnnouncer.enabledProperty.value = true;
  }

  numberCompareUtteranceQueue.initialize( sim.selectedScreenProperty );
} );