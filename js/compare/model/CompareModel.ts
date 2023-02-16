// Copyright 2019-2023, University of Colorado Boulder

/**
 * Model class for the 'Compare' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import CompareCountingType from './CompareCountingType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CountingPlayArea from '../../../../number-suite-common/js/common/model/CountingPlayArea.js';
import Range from '../../../../dot/js/Range.js';
import numberCompare from '../../numberCompare.js';
import CountingObjectType from '../../../../counting-common/js/common/model/CountingObjectType.js';
import TModel from '../../../../joist/js/TModel.js';
import Property from '../../../../axon/js/Property.js';
import numberComparePreferences from '../../common/model/numberComparePreferences.js';
import NumberCompareStrings from '../../NumberCompareStrings.js';
import NumberSuiteCommonConstants from '../../../../number-suite-common/js/common/NumberSuiteCommonConstants.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import NumberCompareConstants from '../../common/NumberCompareConstants.js';
import { SecondLocaleStrings } from '../../../../number-suite-common/js/common/model/NumberSuiteCommonPreferences.js';
import localeProperty from '../../../../joist/js/i18n/localeProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';

// constants
const IS_LESS_THAN_STRING_KEY = `${NumberCompareConstants.NUMBER_COMPARE_REQUIREJS_NAMESPACE}/isLessThan`;
const IS_GREATER_THAN_STRING_KEY = `${NumberCompareConstants.NUMBER_COMPARE_REQUIREJS_NAMESPACE}/isGreaterThan`;
const IS_EQUAL_TO_STRING_KEY = `${NumberCompareConstants.NUMBER_COMPARE_REQUIREJS_NAMESPACE}/isEqualTo`;

class CompareModel implements TModel {

  public readonly sumRange: Range;
  public readonly countingTypeProperty: EnumerationProperty<CompareCountingType>;
  public readonly comparisonSignsAndTextVisibleProperty: Property<boolean>;
  public readonly leftPlayArea: CountingPlayArea;
  public readonly rightPlayArea: CountingPlayArea;
  public readonly leftCountingObjectTypeProperty: EnumerationProperty<CountingObjectType>;
  public readonly rightCountingObjectTypeProperty: EnumerationProperty<CountingObjectType>;
  public readonly comparisonStringProperty: TReadOnlyProperty<string>;

  public constructor( highestCount: number, speechDataProperty: TProperty<string | null>, tandem: Tandem ) {

    this.sumRange = new Range( 0, highestCount );

    this.leftCountingObjectTypeProperty = new EnumerationProperty( CountingObjectType.DOG );
    this.rightCountingObjectTypeProperty = new EnumerationProperty( CountingObjectType.DOG );

    this.countingTypeProperty = new EnumerationProperty( CompareCountingType.BLOCKS );
    this.comparisonSignsAndTextVisibleProperty = new BooleanProperty( true );

    // create the left and right play areas
    this.leftPlayArea = new CountingPlayArea( highestCount, new BooleanProperty( true ), 'leftPlayArea' );
    this.rightPlayArea = new CountingPlayArea( highestCount, new BooleanProperty( true ), 'rightPlayArea' );

    this.comparisonStringProperty = new DerivedProperty( [
      this.leftPlayArea.sumProperty,
      this.rightPlayArea.sumProperty,
      numberComparePreferences.isPrimaryLocaleProperty,
      localeProperty,
      numberComparePreferences.secondLocaleStringsProperty
    ], ( leftCurrentNumber, rightCurrentNumber, isPrimaryLocale, primaryLocale, secondLocaleStrings ) =>
      CompareModel.getComparisonString( leftCurrentNumber, rightCurrentNumber, isPrimaryLocale, secondLocaleStrings ) );

    // Update the speechDataProperty when the comparisonString changes. If the comparison sign and text is not visible,
    // set the speech to null.
    this.comparisonStringProperty.link( comparisonString => {
      speechDataProperty.value = this.comparisonSignsAndTextVisibleProperty.value ? comparisonString : null;
    } );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    numberComparePreferences.isPrimaryLocaleProperty.reset();
    this.leftPlayArea.reset();
    this.rightPlayArea.reset();
    this.rightCountingObjectTypeProperty.reset();
    this.leftCountingObjectTypeProperty.reset();
    this.comparisonSignsAndTextVisibleProperty.reset();
    this.countingTypeProperty.reset();
  }

  /**
   * Builds the string based on the current numbers. Example format: "Three is less than seven"
   */
  private static getComparisonString( leftCurrentNumber: number,
                                      rightCurrentNumber: number,
                                      isPrimaryLocale: boolean,
                                      secondLocaleStrings: SecondLocaleStrings ): string {

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

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }
}

numberCompare.register( 'CompareModel', CompareModel );
export default CompareModel;