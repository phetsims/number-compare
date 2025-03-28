// Copyright 2021-2025, University of Colorado Boulder

/**
 * RectangularRadioButtonGroup for selecting the CompareCountingType on the 'Compare' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Range from '../../../../dot/js/Range.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Color from '../../../../scenery/js/util/Color.js';
import eyeSlashSolidShape from '../../../../sherpa/js/fontawesome-5/eyeSlashSolidShape.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import numberCompare from '../../numberCompare.js';
import CompareCountingType from '../model/CompareCountingType.js';
import BlockValuesNode from './BlockValuesNode.js';
import CompareNumberLineNode from './CompareNumberLineNode.js';

// constants
const ICON_SIZE = 32; // the width and height of the icons used for the buttons, in screen coordinates
const BUTTON_MARGIN = 7; // in screen coordinates

// create a map from each CompareCountingType to a corresponding icon
const COUNTING_TYPE_TO_ICON = new Map();
COUNTING_TYPE_TO_ICON.set( CompareCountingType.BLOCKS, BlockValuesNode.getBlockValuesNode( 1, 2 ) );
COUNTING_TYPE_TO_ICON.set( CompareCountingType.NUMBER_LINE, CompareNumberLineNode.getNumberLineNode(
  20,
  new Range( 0, 5 ), {
    includeLabels: false,
    minorLineWidth: 2, // empirically determined
    majorLineWidth: 4, // empirically determined
    minorTickMarkHalfLineLength: 11, // empirically determined
    majorTickMarkHalfLineLength: 32 // empirically determined
  } ) );
COUNTING_TYPE_TO_ICON.set( CompareCountingType.NONE, new Path( eyeSlashSolidShape, { fill: Color.BLACK } ) );

class CompareCountingTypeRadioButtonGroup extends RectangularRadioButtonGroup<CompareCountingType> {

  public constructor( countingTypeProperty: EnumerationProperty<CompareCountingType> ) {

    // create an icon for each value of CompareCountingType
    const countingTypeRadioButtons = CompareCountingType.enumeration.values.map( countingType => {
      const iconNode = COUNTING_TYPE_TO_ICON.get( countingType );
      iconNode.maxWidth = ICON_SIZE;
      iconNode.maxHeight = ICON_SIZE;

      return {
        value: countingType,
        createNode: ( tandem: Tandem ) => iconNode
      };
    } );

    super( countingTypeProperty, countingTypeRadioButtons, {
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: Color.WHITE,
        xMargin: BUTTON_MARGIN,
        yMargin: BUTTON_MARGIN
      }
    } );
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

numberCompare.register( 'CompareCountingTypeRadioButtonGroup', CompareCountingTypeRadioButtonGroup );
export default CompareCountingTypeRadioButtonGroup;