// Copyright 2021, University of Colorado Boulder

/**
 * Model class for the 'Game' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Luisa Vargas
 */

import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberPlay from '../../numberPlay.js';
import SubitizeGameLevel from './SubitizeGameLevel.js';

class NumberPlayGameModel {

  public levels: SubitizeGameLevel[];
  public levelProperty: Property<null | SubitizeGameLevel>

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem: Tandem ) {

    // @public {SubitizeGameLevel[]}
    this.levels = [ new SubitizeGameLevel( 1, 1, 5 ), new SubitizeGameLevel( 2, 6, 10 ) ];

    // @public {Property.<null|SubitizeGameLevel>} - the selected game level
    // null means 'no selection' and causes the view to return to the level-selection UI
    this.levelProperty = new Property<null | SubitizeGameLevel>( null, {
      validValues: [ null, ...this.levels ]
    } );
  }

  /**
   * Resets the model.
   */
  public reset() {
    this.levels.forEach( level => level.reset() );
  }

  /**
   * Steps the model.
   * @param {number} dt - time step, in seconds
   */
  public step( dt: number ) {
    this.levels.forEach( level => level.step( dt ) );
  }
}

numberPlay.register( 'NumberPlayGameModel', NumberPlayGameModel );
export default NumberPlayGameModel;