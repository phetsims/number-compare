// Copyright 2021-2025, University of Colorado Boulder

/**
 * Text for displaying a comparison statement for the two current numbers.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import NumberSuiteCommonConstants from '../../../../number-suite-common/js/common/NumberSuiteCommonConstants.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import numberCompare from '../../numberCompare.js';

class ComparisonTextNode extends Node {

  public constructor( comparisonStringProperty: TReadOnlyProperty<string>, layoutBounds: Bounds2 ) {
    super();

    // create and add the comparison text
    const textNode = new Text(
      comparisonStringProperty.value, {
        font: new PhetFont( 16 ),
        maxWidth: layoutBounds.erodedX( NumberSuiteCommonConstants.ACCORDION_BOX_MARGIN_X ).width
      } );
    this.addChild( textNode );

    // update the comparison text when the comparison string changes and center our position
    comparisonStringProperty.link( comparisonString => {
      textNode.string = comparisonString;
      this.centerX = layoutBounds.centerX;
    } );
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

numberCompare.register( 'ComparisonTextNode', ComparisonTextNode );
export default ComparisonTextNode;