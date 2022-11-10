// Copyright 2021-2022, University of Colorado Boulder

/**
 * Text for displaying a comparison statement for the two current numbers.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import NumberPlayConstants from '../../../../number-play/js/common/NumberPlayConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberCompareStrings from '../../NumberCompareStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import numberCompare from '../../numberCompare.js';
import numberComparePreferences from '../../common/model/numberComparePreferences.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';

class ComparisonTextNode extends Node {
  public readonly comparisonStringProperty: TReadOnlyProperty<string>;

  public constructor( leftCurrentNumberProperty: NumberProperty,
                      rightCurrentNumberProperty: NumberProperty,
                      isPrimaryLocaleProperty: BooleanProperty,
                      layoutBounds: Bounds2 ) {
    super();

    // (read-only) - update the comparison string when either current number changes.
    // this string value is stored in a Property (instead of just setting the text directly) so it can be read
    // elsewhere in the screen view.
    this.comparisonStringProperty = new DerivedProperty(
      [ leftCurrentNumberProperty, rightCurrentNumberProperty, isPrimaryLocaleProperty, phet.joist.localeProperty,
        numberComparePreferences.secondLocaleStringsProperty ],
      ( leftCurrentNumber, rightCurrentNumber, isPrimaryLocale, primaryLocale, secondLocaleStrings ) =>
        ComparisonTextNode.getComparisonString( leftCurrentNumber, rightCurrentNumber, isPrimaryLocale, secondLocaleStrings ) );

    // create and add the comparison text
    const textNode = new Text(
      this.comparisonStringProperty.value, {
        font: new PhetFont( 16 ),
        maxWidth: layoutBounds.erodedX( NumberPlayConstants.ACCORDION_BOX_MARGIN_X ).width
      } );
    this.addChild( textNode );

    // update the comparison text when the comparison string changes and center our position
    this.comparisonStringProperty.link( comparisonString => {
      textNode.text = comparisonString;
      this.centerX = layoutBounds.centerX;
    } );
  }

  /**
   * Builds the string based on the current numbers. Example format: "Three is less than seven"
   */
  private static getComparisonString( leftCurrentNumber: number, rightCurrentNumber: number,
                                      isPrimaryLocale: boolean, secondLocaleStrings: IntentionalAny ): string {

    let isLessThanString = NumberCompareStrings.isLessThanStringProperty.value;
    let isMoreThanString = NumberCompareStrings.isMoreThanStringProperty.value;
    let isEqualToString = NumberCompareStrings.isEqualToStringProperty.value;

    // TODO: factor these out somewhere?
    const numberComparePrefix = 'NUMBER_COMPARE/';
    if ( !isPrimaryLocale ) {
      isLessThanString = secondLocaleStrings[ `${numberComparePrefix}isLessThan` ];
      isMoreThanString = secondLocaleStrings[ `${numberComparePrefix}isMoreThan` ];
      isEqualToString = secondLocaleStrings[ `${numberComparePrefix}isEqualTo` ];
    }

    const numberPlayPrefix = 'NUMBER_PLAY/';
    const leftNumberString = NumberPlayConstants.numberToString( secondLocaleStrings,
      leftCurrentNumber, isPrimaryLocale, numberPlayPrefix );
    const rightNumberString = NumberPlayConstants.numberToString( secondLocaleStrings,
      rightCurrentNumber, isPrimaryLocale, numberPlayPrefix );
    let comparisonString;

    if ( leftCurrentNumber < rightCurrentNumber ) {
      comparisonString = StringUtils.fillIn( isLessThanString, {
        smallerNumber: leftNumberString,
        greaterNumber: rightNumberString
      } );
    }
    else if ( leftCurrentNumber > rightCurrentNumber ) {
      comparisonString = StringUtils.fillIn( isMoreThanString, {
        greaterNumber: leftNumberString,
        smallerNumber: rightNumberString
      } );
    }
    else {
      comparisonString = StringUtils.fillIn( isEqualToString, {
        equalNumberLeft: leftNumberString,
        equalNumberRight: rightNumberString
      } );
    }

    return comparisonString;
  }
}

numberCompare.register( 'ComparisonTextNode', ComparisonTextNode );
export default ComparisonTextNode;