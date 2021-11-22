// Copyright 2021, University of Colorado Boulder

/**
 * CountingGameLevel is the class for a 'Counting' game level model.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Luisa Vargas
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import OnesPlayArea from '../../common/model/OnesPlayArea.js';
import numberPlay from '../../numberPlay.js';
import NumberPlayGameLevel from './NumberPlayGameLevel.js';
import Range from '../../../../dot/js/Range.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import PlayObjectType from '../../../../counting-common/js/common/model/PlayObjectType.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

// constants
const LEVEL_INPUT_RANGE = 10;

class CountingGameLevel extends NumberPlayGameLevel {

  public readonly objectsPlayArea: OnesPlayArea;
  public readonly playObjectTypeProperty: EnumerationProperty;
  public readonly isObjectsRepresentationProperty: BooleanProperty;

  constructor( levelNumber: number ) {
    super( levelNumber, LEVEL_INPUT_RANGE );

    this.objectsPlayArea = new OnesPlayArea( this.challengeNumberProperty, new Vector2( 0, 0 ), {
      isOnes: false,
      sumPropertyRange: new Range( 0, this.challengeNumberProperty.range!.max ),
      setAllObjects: true
    } );

    // @ts-ignore
    this.playObjectTypeProperty = new EnumerationProperty( PlayObjectType, CountingGameLevel.getRandomPlayObjectType() );
    this.isObjectsRepresentationProperty = new BooleanProperty( true );
  }

  /**
   * Return a new object type for the current challenge.
   */
  private static getRandomPlayObjectType() {
    // @ts-ignore
    return PlayObjectType[ dotRandom.sample( PlayObjectType.KEYS ) ];
  }

  public reset() {
    super.reset();
    this.playObjectTypeProperty.reset();
    this.isObjectsRepresentationProperty.reset();
  }

  public step( dt: number ) {
  }

  /**
   * Sets up a new challenge for this level.
   */
  public newChallenge() {
    super.newChallenge();
    // @ts-ignore
    this.playObjectTypeProperty.value = CountingGameLevel.getRandomPlayObjectType();
    this.isObjectsRepresentationProperty.value = !this.isObjectsRepresentationProperty.value;
  }
}

numberPlay.register( 'CountingGameLevel', CountingGameLevel );
export default CountingGameLevel;