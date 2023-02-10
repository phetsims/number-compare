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
import localeProperty from '../../../../joist/js/i18n/localeProperty.js';
import NumberCompareStrings from '../../NumberCompareStrings.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import numberCompare from '../../numberCompare.js';
import numberComparePreferences from '../../common/model/numberComparePreferences.js';
import NumberSuiteCommonConstants from '../../../../number-suite-common/js/common/NumberSuiteCommonConstants.js';
import { SecondLocaleStrings } from '../../../../number-suite-common/js/common/model/NumberSuiteCommonPreferences.js';
import NumberCompareConstants from '../../common/NumberCompareConstants.js';

// constants
const IS_LESS_THAN_STRING_KEY = `${NumberCompareConstants.NUMBER_COMPARE_REQUIREJS_NAMESPACE}/isLessThan`;
const IS_GREATER_THAN_STRING_KEY = `${NumberCompareConstants.NUMBER_COMPARE_REQUIREJS_NAMESPACE}/isGreaterThan`;
const IS_EQUAL_TO_STRING_KEY = `${NumberCompareConstants.NUMBER_COMPARE_REQUIREJS_NAMESPACE}/isEqualTo`;

class ComparisonTextNode extends Node {

  // updates the comparison string when either current number changes. this string value is stored in a Property
  // (instead of just setting the text directly) so it can be read elsewhere in the screen view.
  public readonly comparisonStringProperty: TReadOnlyProperty<string>;

  public constructor( leftCurrentNumberProperty: TReadOnlyProperty<number>,
                      rightCurrentNumberProperty: TReadOnlyProperty<number>,
                      layoutBounds: Bounds2 ) {
    super();

    this.comparisonStringProperty = new DerivedProperty(
      [ leftCurrentNumberProperty, rightCurrentNumberProperty, numberComparePreferences.isPrimaryLocaleProperty,
        localeProperty, numberComparePreferences.secondLocaleStringsProperty ],
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

    const isLessThanString = NumberSuiteCommonConstants.getString( NumberCompareStrings.isLessThanStringProperty.value,
      secondLocaleStrings[ IS_LESS_THAN_STRING_KEY ], IS_LESS_THAN_STRING_KEY, isPrimaryLocale );
    const isGreaterThanString = NumberSuiteCommonConstants.getString( NumberCompareStrings.isGreaterThanStringProperty.value,
      secondLocaleStrings[ IS_GREATER_THAN_STRING_KEY ], IS_GREATER_THAN_STRING_KEY, isPrimaryLocale );
    const isEqualToString = NumberSuiteCommonConstants.getString( NumberCompareStrings.isEqualToStringProperty.value,
      secondLocaleStrings[ IS_EQUAL_TO_STRING_KEY ], IS_EQUAL_TO_STRING_KEY, isPrimaryLocale );

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
      comparisonString = StringUtils.fillIn( isGreaterThanString, {
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