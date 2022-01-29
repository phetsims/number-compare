// Copyright 2019-2020, University of Colorado Boulder

/**
 * The model information for a DraggableTenFrameNode
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Vector2Property from '../../../../dot/js/Vector2Property.js';
import TenFrameNode from '../../common/view/TenFrameNode.js';
import numberPlay from '../../numberPlay.js';
import Vector2 from '../../../../dot/js/Vector2.js';

class TenFrame {
  public readonly squareSideLength: number;
  public readonly spotCenters: Vector2[];
  public positionProperty: Vector2Property;

  constructor( squareSideLength: number, initialPosition: Vector2 ) {

    // @public {number} - the side length of the squares that make up the ten frame
    this.squareSideLength = squareSideLength;

    // @public {Vector2[]}
    this.spotCenters = TenFrameNode.getSpotCenters( {
      sideLength: squareSideLength
    } );

    // @public {Vector2Property}
    this.positionProperty = new Vector2Property( initialPosition );
  }
}

numberPlay.register( 'TenFrame', TenFrame );
export default TenFrame;