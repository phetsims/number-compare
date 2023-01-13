// Copyright 2021-2023, University of Colorado Boulder

/**
 * Text for displaying a comparison statement for the two current numbers.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import NumberCompareStrings from '../../NumberCompareStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import numberCompare from '../../numberCompare.js';
import numberComparePreferences from '../../common/model/numberComparePreferences.js';
import NumberSuiteCommonConstants from '../../../../number-suite-common/js/common/NumberSuiteCommonConstants.js';
import { SecondLocaleStrings } from '../../../../number-suite-common/js/common/model/NumberSuiteCommonPreferences.js';

class ComparisonTextNode extends Node {

  // (read-only) - update the comparison string when either current number changes.
  // this string value is stored in a Property (instead of just setting the text directly) so it can be read
  // elsewhere in the screen view.
  public readonly comparisonStringProperty: TReadOnlyProperty<string>;

  public constructor( leftCurrentNumberProperty: TReadOnlyProperty<number>,
                      rightCurrentNumberProperty: TReadOnlyProperty<number>,
                      isPrimaryLocaleProperty: TReadOnlyProperty<boolean>,
                      layoutBounds: Bounds2 ) {
    super();

    this.comparisonStringProperty = new DerivedProperty(
      [ leftCurrentNumberProperty, rightCurrentNumberProperty, isPrimaryLocaleProperty, phet.joist.localeProperty,
        numberComparePreferences.secondLocaleStringsProperty ],
      ( leftCurrentNumber, rightCurrentNumber, isPrimaryLocale, primaryLocale,
        secondLocaleStrings ) =>
        ComparisonTextNode.getComparisonString( leftCurrentNumber, rightCurrentNumber, isPrimaryLocale, secondLocaleStrings ) );

    // create and add the comparison text
    const textNode = new Text(
      this.comparisonStringProperty.value, {
        font: new PhetFont( 16 ),
        maxWidth: layoutBounds.erodedX( NumberSuiteCommonConstants.ACCORDION_BOX_MARGIN_X ).width
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
                                      isPrimaryLocale: boolean, secondLocaleStrings: SecondLocaleStrings ): string {

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

    const leftNumberWord = NumberSuiteCommonConstants.numberToWord( secondLocaleStrings,
      leftCurrentNumber, isPrimaryLocale );
    const rightNumberWord = NumberSuiteCommonConstants.numberToWord( secondLocaleStrings,
      rightCurrentNumber, isPrimaryLocale );
    let comparisonString;

    if ( leftCurrentNumber < rightCurrentNumber ) {
      comparisonString = StringUtils.fillIn( isLessThanString, {
        smallerNumber: leftNumberWord,
        greaterNumber: rightNumberWord
      } );
    }
    else if ( leftCurrentNumber > rightCurrentNumber ) {
      comparisonString = StringUtils.fillIn( isMoreThanString, {
        greaterNumber: leftNumberWord,
        smallerNumber: rightNumberWord
      } );
    }
    else {
      comparisonString = StringUtils.fillIn( isEqualToString, {
        equalNumberLeft: leftNumberWord,
        equalNumberRight: rightNumberWord
      } );
    }

    return comparisonString;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

numberCompare.register( 'ComparisonTextNode', ComparisonTextNode );
export default ComparisonTextNode;