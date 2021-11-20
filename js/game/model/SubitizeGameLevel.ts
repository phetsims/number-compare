// Copyright 2021, University of Colorado Boulder

/**
 * SubitizeGameLevel is the class for a 'Subitize' game level model.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Luisa Vargas
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import numberPlay from '../../numberPlay.js';
import numberPlayStrings from '../../numberPlayStrings.js';
import NumberPlayGameLevel from './NumberPlayGameLevel.js';
import Subitizer from './Subitizer.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

class SubitizeGameLevel extends NumberPlayGameLevel {

  public readonly questionStringProperty: StringProperty;
  public readonly subitizer: Subitizer;
  public playButtonVisibleProperty: BooleanProperty;
  public startSequencePlayingProperty: BooleanProperty;

  constructor( levelNumber: number, minimumSubitizeNumber: number, maximumSubitizeNumber: number ) {
    super( levelNumber, minimumSubitizeNumber, maximumSubitizeNumber );

    // whether the start sequence is playing. This can also be used to stop an existing animation.
    this.startSequencePlayingProperty = new BooleanProperty( false );

    this.subitizer = new Subitizer( this.challengeNumberProperty, this.numberOfAnswerButtonPressesProperty,
      this.startSequencePlayingProperty, levelNumber === 1 );

    this.playButtonVisibleProperty = new BooleanProperty( true );
    this.questionStringProperty = new DerivedProperty( [ this.subitizer.objectTypeProperty ], objectType => {
      return objectType === 'circle' ? numberPlayStrings.howManyDots : numberPlayStrings.howManyObjects;
    } );
  }

  /**
   * Shows the start sequence if the current challenge is unsolved.
   */
  public resetStartSequence() {
    if ( !this.isSolvedProperty.value ) {
      this.startSequencePlayingProperty.reset();
      this.playButtonVisibleProperty.reset();
      this.subitizer.inputEnabledProperty.reset();
    }
  }

  /**
   * Sets up a new challenge for this level.
   */
  public newChallenge(): void {
    super.newChallenge();
    this.subitizer.newChallenge();
  }

  public reset() {
    super.reset();
    this.subitizer.reset();
    this.playButtonVisibleProperty.reset();
  }

  public step( dt: number ) {
    this.subitizer.step( dt );
  }
}

numberPlay.register( 'SubitizeGameLevel', SubitizeGameLevel );
export default SubitizeGameLevel;