// Copyright 2019-2022, University of Colorado Boulder

/**
 * ScreenView for the 'Compare' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Range from '../../../../dot/js/Range.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import LocaleSwitch from '../../../../number-suite-common/js/common/view/LocaleSwitch.js';
import SpeechSynthesisButton from '../../../../number-suite-common/js/common/view/SpeechSynthesisButton.js';
import TotalAccordionBox, { TotalAccordionBoxOptions } from '../../../../number-suite-common/js/common/view/TotalAccordionBox.js';
import CompareCountingType from '../model/CompareCountingType.js';
import CompareModel from '../model/CompareModel.js';
import BlockValuesNode from './BlockValuesNode.js';
import CompareCountingTypeRadioButtonGroup from './CompareCountingTypeRadioButtonGroup.js';
import CompareNumberLineNode from './CompareNumberLineNode.js';
import ComparisonTextNode from './ComparisonTextNode.js';
import CountingAccordionBox, { CountingAccordionBoxOptions } from '../../../../number-suite-common/js/common/view/CountingAccordionBox.js';
import OrganizeButton from '../../../../number-suite-common/js/common/view/OrganizeButton.js';
import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CountingObjectType from '../../../../counting-common/js/common/model/CountingObjectType.js';
import numberCompare from '../../numberCompare.js';
import numberComparePreferences from '../../common/model/numberComparePreferences.js';
import numberCompareSpeechSynthesisAnnouncer from '../../common/view/numberCompareSpeechSynthesisAnnouncer.js';
import numberCompareUtteranceQueue from '../../common/view/numberCompareUtteranceQueue.js';
import NumberCompareColors from '../../common/NumberCompareColors.js';
import NumberSuiteCommonColors from '../../../../number-suite-common/js/common/NumberSuiteCommonColors.js';
import NumberSuiteCommonConstants from '../../../../number-suite-common/js/common/NumberSuiteCommonConstants.js';

// constants
const UPPER_ACCORDION_BOX_CONTENT_HEIGHT = 80; // in screen coordinates
const LOWER_ACCORDION_BOX_CONTENT_WIDTH = 390; // in screen coordinates

// strings
const lessThanString = '<';
const equalString = '=';
const greaterThanString = '>';

class CompareScreenView extends ScreenView {
  private readonly leftTotalAccordionBoxExpandedProperty: BooleanProperty;
  private readonly rightTotalAccordionBoxExpandedProperty: BooleanProperty;
  private readonly rightCountingAccordionBoxExpandedProperty: BooleanProperty;
  private readonly leftCountingAccordionBoxExpandedProperty: BooleanProperty;

  public constructor( model: CompareModel, tandem: Tandem ) {

    super( { tandem: tandem } );

    this.leftTotalAccordionBoxExpandedProperty = new BooleanProperty( true );
    this.rightTotalAccordionBoxExpandedProperty = new BooleanProperty( true );
    this.leftCountingAccordionBoxExpandedProperty = new BooleanProperty( true );
    this.rightCountingAccordionBoxExpandedProperty = new BooleanProperty( true );

    // config for the left and right TotalAccordionBox
    const totalAccordionBoxOptions = {
      font: new PhetFont( 78 ),
      arrowButtonOptions: {
        arrowWidth: 15, // empirically determined
        arrowHeight: 15 // empirically determined
      },
      arrowButtonSpacing: 5 // empirically determined
    };

    // create and add the left TotalAccordionBox
    const leftTotalAccordionBox = new TotalAccordionBox( model.leftPlayArea, UPPER_ACCORDION_BOX_CONTENT_HEIGHT,
      optionize<TotalAccordionBoxOptions, EmptySelfOptions>()( {
        expandedProperty: this.leftTotalAccordionBoxExpandedProperty,
        fill: NumberCompareColors.mediumPurpleBackgroundColorProperty
      }, totalAccordionBoxOptions ) );
    leftTotalAccordionBox.top = this.layoutBounds.minY + NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_Y;
    this.addChild( leftTotalAccordionBox );

    // create and add the right TotalAccordionBox
    const rightTotalAccordionBox = new TotalAccordionBox( model.rightPlayArea, UPPER_ACCORDION_BOX_CONTENT_HEIGHT,
      optionize<TotalAccordionBoxOptions, EmptySelfOptions>()( {
        expandedProperty: this.rightTotalAccordionBoxExpandedProperty,
        fill: NumberSuiteCommonColors.lightOrangeBackgroundColorProperty
      }, totalAccordionBoxOptions ) );
    rightTotalAccordionBox.top = leftTotalAccordionBox.top;
    this.addChild( rightTotalAccordionBox );

    // create and add the left CountingAccordionBox
    const leftCountingAccordionBox = new CountingAccordionBox(
      model.leftPlayArea,
      model.leftCountingObjectTypeProperty,
      LOWER_ACCORDION_BOX_CONTENT_WIDTH,
      NumberSuiteCommonConstants.TALL_LOWER_ACCORDION_BOX_HEIGHT, {
        countingObjectTypes: CountingObjectType.enumeration.values,
        expandedProperty: this.leftCountingAccordionBoxExpandedProperty,
        fill: NumberCompareColors.mediumPurpleBackgroundColorProperty
      } as unknown as CountingAccordionBoxOptions );
    leftCountingAccordionBox.left = NumberSuiteCommonConstants.ACCORDION_BOX_MARGIN_X;
    leftCountingAccordionBox.bottom = this.layoutBounds.maxY - NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_Y;
    this.addChild( leftCountingAccordionBox );

    // create and add the right CountingAccordionBox
    const rightCountingAccordionBox = new CountingAccordionBox(
      model.rightPlayArea,
      model.rightCountingObjectTypeProperty,
      LOWER_ACCORDION_BOX_CONTENT_WIDTH,
      NumberSuiteCommonConstants.TALL_LOWER_ACCORDION_BOX_HEIGHT, {
        countingObjectTypes: CountingObjectType.enumeration.values,
        expandedProperty: this.rightCountingAccordionBoxExpandedProperty,
        fill: NumberSuiteCommonColors.lightOrangeBackgroundColorProperty
      } as unknown as CountingAccordionBoxOptions );
    rightCountingAccordionBox.right = this.layoutBounds.maxX - NumberSuiteCommonConstants.ACCORDION_BOX_MARGIN_X;
    rightCountingAccordionBox.bottom = leftCountingAccordionBox.bottom;
    this.addChild( rightCountingAccordionBox );

    // set the x-position of the TotalAccordionBox's after the CompareObjectAccordionBoxes have been added
    leftTotalAccordionBox.right = leftCountingAccordionBox.right;
    rightTotalAccordionBox.left = rightCountingAccordionBox.left;

    // create and add the ComparisonTextNode
    const comparisonTextNode = new ComparisonTextNode(
      model.leftPlayArea.sumProperty,
      model.rightPlayArea.sumProperty,
      model.isPrimaryLocaleProperty,
      this.layoutBounds
    );
    comparisonTextNode.centerY = new Range( leftTotalAccordionBox.bottom, leftCountingAccordionBox.top ).getCenter();
    this.addChild( comparisonTextNode );

    // positioning variables for the LocaleSwitch that depend on whether the SpeechSynthesisButton is created below
    let localeSwitchXRange;
    let localeSwitchCenterY;

    // create and add the SpeechSynthesisButton if the announcer is initialized
    if ( numberCompareSpeechSynthesisAnnouncer.initialized ) {
      const speechSynthesisButton = new SpeechSynthesisButton( model.isPrimaryLocaleProperty, numberComparePreferences,
        numberCompareSpeechSynthesisAnnouncer, numberCompareUtteranceQueue, {
          stringProperty: comparisonTextNode.comparisonStringProperty,
          numberProperty: model.leftPlayArea.sumProperty,
          secondNumberProperty: model.rightPlayArea.sumProperty
        }
      );
      speechSynthesisButton.left = NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_X;
      speechSynthesisButton.top = rightTotalAccordionBox.top;
      this.addChild( speechSynthesisButton );

      // position the localeSwitch relative to the speechSynthesisButton
      localeSwitchXRange = new Range( speechSynthesisButton.right, leftTotalAccordionBox.left );
      localeSwitchCenterY = speechSynthesisButton.centerY;
    }
    else {

      // position the localeSwitch relative to the rightTotalAccordionBox if the speechSynthesisButton doesn't exist
      localeSwitchXRange = new Range( this.layoutBounds.minX, leftTotalAccordionBox.left );
      localeSwitchCenterY = leftTotalAccordionBox.top + 20;
    }

    // create and add the LocaleSwitch
    const localeSwitchXMargin = 15; // empirically determined
    const localeSwitchMaxWidth = localeSwitchXRange.getLength() - localeSwitchXMargin * 2;
    const localeSwitch = new LocaleSwitch( model.isPrimaryLocaleProperty, numberComparePreferences.showSecondLocaleProperty,
      numberComparePreferences.secondLocaleStringsProperty, localeSwitchMaxWidth );
    localeSwitch.centerX = localeSwitchXRange.getCenter();
    localeSwitch.centerY = localeSwitchCenterY;
    this.addChild( localeSwitch );

    // create and add the comparison signs node
    const comparisonSignsNode = new Text( equalString, { font: new PhetFont( 90 ) } );
    this.addChild( comparisonSignsNode );
    comparisonSignsNode.centerX = this.layoutBounds.centerX;
    comparisonSignsNode.centerY = leftTotalAccordionBox.centerY;

    // create and add the CompareCountingTypeRadioButtonGroup
    const countingTypeRadioButtonGroup = new CompareCountingTypeRadioButtonGroup( model.countingTypeProperty );
    countingTypeRadioButtonGroup.right = this.layoutBounds.maxX - NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_X;
    countingTypeRadioButtonGroup.top = leftTotalAccordionBox.top;
    this.addChild( countingTypeRadioButtonGroup );

    // create and add the show comparison checkbox
    const showComparisonCheckbox = new Checkbox( model.comparisonSignsAndTextVisibleProperty, new Text( `${lessThanString} ${equalString} ${greaterThanString}`, { font: new PhetFont( 20 ) } ) );
    showComparisonCheckbox.right = countingTypeRadioButtonGroup.right;
    showComparisonCheckbox.top = countingTypeRadioButtonGroup.bottom + 14; // empirically determined
    this.addChild( showComparisonCheckbox );

    // create and add the BlockValuesNode
    const blockValuesNode = new BlockValuesNode( model.leftPlayArea.sumProperty, model.rightPlayArea.sumProperty );
    this.addChild( blockValuesNode );

    // create and add the CompareNumberLineNode
    const compareNumberLineNode = new CompareNumberLineNode(
      NumberSuiteCommonConstants.TALL_LOWER_ACCORDION_BOX_HEIGHT - 22,
      model.leftPlayArea.sumProperty,
      model.rightPlayArea.sumProperty,
      model.sumRange
    );
    compareNumberLineNode.x = comparisonSignsNode.centerX;
    compareNumberLineNode.bottom = leftCountingAccordionBox.bottom + 3;
    this.addChild( compareNumberLineNode );

    // create and add the ResetAllButton
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_X,
      bottom: this.layoutBounds.maxY - NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_Y,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // create and add a button to organize the left counting objects in a grid
    const leftOrganizeButton = new OrganizeButton( NumberCompareColors.mediumPurpleBackgroundColorProperty, () => {
      model.leftPlayArea.organizeObjects();
    } );
    leftOrganizeButton.left = NumberSuiteCommonConstants.SCREEN_VIEW_PADDING_X;
    leftOrganizeButton.top = leftCountingAccordionBox.top;
    this.addChild( leftOrganizeButton );

    // create and add a button to organize the objectsAccordionBox play objects in a grid
    const rightOrganizeButton = new OrganizeButton( NumberSuiteCommonColors.lightOrangeBackgroundColorProperty, () => {
      model.rightPlayArea.organizeObjects();
    } );
    rightOrganizeButton.centerX = resetAllButton.centerX;
    rightOrganizeButton.top = rightCountingAccordionBox.top;
    this.addChild( rightOrganizeButton );

    // update the comparison signs node's text and the BlockValuesNode when either current number changes
    Multilink.multilink( [ model.leftPlayArea.sumProperty, model.rightPlayArea.sumProperty ],
      ( leftCurrentNumber, rightCurrentNumber ) => {
        comparisonSignsNode.text = leftCurrentNumber < rightCurrentNumber ? lessThanString :
                                   leftCurrentNumber > rightCurrentNumber ? greaterThanString : equalString;

        blockValuesNode.removeAllChildren();
        blockValuesNode.addChild( BlockValuesNode.getBlockValuesNode( leftCurrentNumber, rightCurrentNumber ) );
        blockValuesNode.centerX = comparisonSignsNode.centerX;
        blockValuesNode.bottom = leftCountingAccordionBox.bottom - 4; // empirically determined tweak
      } );

    // update the visibility of the comparison signs node
    model.comparisonSignsAndTextVisibleProperty.link( visible => {
      comparisonSignsNode.visible = visible;
      comparisonTextNode.visible = visible;
    } );

    // update the visibility of the BlockValuesNode and NumberLineNode
    model.countingTypeProperty.link( countingType => {
      blockValuesNode.visible = countingType === CompareCountingType.BLOCKS;
      compareNumberLineNode.visible = countingType === CompareCountingType.NUMBER_LINE;
    } );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    this.leftTotalAccordionBoxExpandedProperty.reset();
    this.rightTotalAccordionBoxExpandedProperty.reset();
    this.leftCountingAccordionBoxExpandedProperty.reset();
    this.rightCountingAccordionBoxExpandedProperty.reset();
  }
}

numberCompare.register( 'CompareScreenView', CompareScreenView );
export default CompareScreenView;