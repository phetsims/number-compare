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
import NumberPlayQueryParameters from './../../number-play/js/common/NumberPlayQueryParameters.js';
import LabScreen from './../../number-play/js/lab/LabScreen.js';
import numberPlaySpeechSynthesisAnnouncer from './../../number-play/js/common/view/numberPlaySpeechSynthesisAnnouncer.js';
import { Display } from '../../scenery/js/imports.js';
import DerivedProperty from '../../axon/js/DerivedProperty.js';
import audioManager from '../../joist/js/audioManager.js';
import SpeechSynthesisAnnouncer from '../../utterance-queue/js/SpeechSynthesisAnnouncer.js';
import Screen from '../../joist/js/Screen.js';
import soundManager from '../../tambo/js/soundManager.js';
import NumberPlayModel from './../../number-play/js/common/model/NumberPlayModel.js';
import NumberCompareStrings from './NumberCompareStrings.js';

// get our second locale strings
if ( NumberPlayQueryParameters.secondLocale ) {
  const secondLocaleStrings = phet.chipper.strings[ NumberPlayQueryParameters.secondLocale ];

  if ( secondLocaleStrings ) {
    phet.numberPlay.secondLocaleStrings = secondLocaleStrings;
  }
  else {
    QueryStringMachine.addWarning( 'secondLocale', NumberPlayQueryParameters.secondLocale,
      `Second locale doesn't exist: ${NumberPlayQueryParameters.secondLocale}` );
  }
}

const numberPlayTitleStringProperty = NumberCompareStrings[ 'number-compare' ].titleStringProperty;

const simOptions: SimOptions = {
  credits: {
    //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Klusendorf, Luisa Vargas',
    team: 'Sylvia Celedón-Pattichis, Ariel Paul, Kathy Perkins, Ian Whitacre',
    qualityAssurance: 'Clifford Hardin, Emily Miller, Nancy Salpepi, Kathryn Woessner',
    graphicArts: 'Mariah Hermsmeyer',
    thanks: 'Andrea Barraugh (Math Transformations), Kristin Donley, Bertha Orona'
  }
};

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {
  const sim = new Sim( numberPlayTitleStringProperty, [
    new CompareScreen( Tandem.ROOT.createTandem( 'compareScreen' ) ),
    new LabScreen( Tandem.ROOT.createTandem( 'numberCompareLabScreen' ) )
  ], simOptions );
  sim.start();

  soundManager.setOutputLevelForCategory( 'user-interface', 0 );

  // initialize the SpeechSynthesisAnnouncer that will use speech synthesis to speak numbers
  if ( SpeechSynthesisAnnouncer.isSpeechSynthesisSupported() ) {
    numberPlaySpeechSynthesisAnnouncer.initialize( Display.userGestureEmitter, {

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

    numberPlaySpeechSynthesisAnnouncer.enabledProperty.value = true;
  }

  // Update the speech synthesis voice to match the locale toggle value of the new screen. This is needed because each
  // screen has its own control for the speech synthesis locale, so the locale for the browser tab needs to be updated
  // to match whenever the screen changes.
  if ( NumberPlayQueryParameters.secondLocale ) {
    sim.selectedScreenProperty.lazyLink( ( screen: Screen ) => {

      if ( screen.model instanceof NumberPlayModel &&
           numberPlaySpeechSynthesisAnnouncer.initialized && screen.model.isPrimaryLocaleProperty ) {
        numberPlaySpeechSynthesisAnnouncer.updateVoice( screen.model.isPrimaryLocaleProperty.value );
      }
    } );
  }
} );