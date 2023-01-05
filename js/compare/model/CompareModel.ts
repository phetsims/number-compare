// Copyright 2019-2022, University of Colorado Boulder

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

class CompareModel implements TModel {
  public readonly sumRange: Range; // TODO: Factor out base class with NumberPlayModel.js
  public readonly countingTypeProperty: EnumerationProperty<CompareCountingType>;
  public readonly comparisonSignsAndTextVisibleProperty: Property<boolean>;
  public readonly leftPlayArea: CountingPlayArea;
  public readonly rightPlayArea: CountingPlayArea;

  // whether the sim is using the locale it was loaded in or a second locale
  public readonly isPrimaryLocaleProperty: Property<boolean>;
  public readonly leftCountingObjectTypeProperty: EnumerationProperty<CountingObjectType>;
  public readonly rightCountingObjectTypeProperty: EnumerationProperty<CountingObjectType>;

  public constructor( highestCount: number, tandem: Tandem ) {

    this.sumRange = new Range( 0, highestCount );

    this.leftCountingObjectTypeProperty = new EnumerationProperty( CountingObjectType.DOG );
    this.rightCountingObjectTypeProperty = new EnumerationProperty( CountingObjectType.DOG );

    this.countingTypeProperty = new EnumerationProperty( CompareCountingType.BLOCKS );
    this.comparisonSignsAndTextVisibleProperty = new BooleanProperty( true );

    this.isPrimaryLocaleProperty = new BooleanProperty( true );

    // create the left and right play areas
    this.leftPlayArea = new CountingPlayArea( highestCount, new BooleanProperty( true ), 'leftPlayArea' );
    this.rightPlayArea = new CountingPlayArea( highestCount, new BooleanProperty( true ), 'rightPlayArea' );
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    this.isPrimaryLocaleProperty.reset();
    this.leftPlayArea.reset();
    this.rightPlayArea.reset();
    this.rightCountingObjectTypeProperty.reset();
    this.leftCountingObjectTypeProperty.reset();
    this.comparisonSignsAndTextVisibleProperty.reset();
    this.countingTypeProperty.reset();
  }
}

numberCompare.register( 'CompareModel', CompareModel );
export default CompareModel;