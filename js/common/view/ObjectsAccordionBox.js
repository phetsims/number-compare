// Copyright 2019, University of Colorado Boulder

/**
 * Class for the 'Objects' accordion box, which is the panel in the lower right corner of the sim that displays an
 * environment for counting with various objects.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const merge = require( 'PHET_CORE/merge' );
  const numberPlay = require( 'NUMBER_PLAY/numberPlay' );
  const NumberPlayConstants = require( 'NUMBER_PLAY/common/NumberPlayConstants' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const objectsString = require( 'string!NUMBER_PLAY/objects' );

  class ObjectsAccordionBox extends AccordionBox {

    /**
     * @param {NumberProperty} currentNumberProperty
     * @param {number} height - the height of this accordion box
     * @param {Object} [options]
     */
    constructor( currentNumberProperty, height, options ) {

      options = merge( {
        titleNode: new Text( objectsString, { font: NumberPlayConstants.ACCORDION_BOX_TITLE_FONT } ),
        fill: NumberPlayConstants.BLUE_BACKGROUND
      }, NumberPlayConstants.ACCORDION_BOX_OPTIONS, options );

      const contentNode = new Rectangle( { rectHeight: height } );

      super( contentNode, options );
    }
  }

  return numberPlay.register( 'ObjectsAccordionBox', ObjectsAccordionBox );
} );