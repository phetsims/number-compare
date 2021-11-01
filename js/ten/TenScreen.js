// Copyright 2019-2021, University of Colorado Boulder

/**
 * The 'Ten' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Vector2 from '../../../dot/js/Vector2.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import Image from '../../../scenery/js/nodes/Image.js';
import tenScreenIconImage from '../../images/ten_screen_icon_png.js';
import NumberPlayModel from '../common/model/NumberPlayModel.js';
import NumberPlayConstants from '../common/NumberPlayConstants.js';
import NumberPlayScreenView from '../common/view/NumberPlayScreenView.js';
import numberPlay from '../numberPlay.js';
import numberPlayStrings from '../numberPlayStrings.js';

const screenTenString = numberPlayStrings.screen.ten;


class TenScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const screenOptions = {
      name: screenTenString,
      backgroundColorProperty: new Property( NumberPlayConstants.TEN_SCREEN_BACKGROUND ),
      homeScreenIcon: new ScreenIcon( new Image( tenScreenIconImage ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    };

    const screenViewConfig = {
      wordAccordionBoxConfig: {
        fill: NumberPlayConstants.GREEN_BACKGROUND,
        font: new PhetFont( 62 ),
        textOffset: new Vector2( 0, -1 ),
        localeSwitchOffset: new Vector2( 0, -12 ),
        speakerButtonOffset: new Vector2( 16, 6 ),
        speakerButtonScale: 1
      },
      totalAccordionBoxConfig: {
        fill: NumberPlayConstants.LIGHT_ORANGE_BACKGROUND,
        font: new PhetFont( 98 ),
        contentXMargin: 0, // zero out to manage x margins in subclass
        arrowButtonConfig: {
          arrowWidth: 20,  // empirically determined
          arrowHeight: 20, // empirically determined
          spacing: 10      // empirically determined
        }
      },
      tenFrameAccordionBoxOptions: {
        fill: NumberPlayConstants.GREEN_BACKGROUND,
        contentAlign: 'center'
      },
      upperAccordionBoxHeight: NumberPlayConstants.TEN_UPPER_ACCORDION_BOX_HEIGHT,
      lowerAccordionBoxHeight: NumberPlayConstants.TEN_LOWER_ACCORDION_BOX_HEIGHT,
      tandem: tandem.createTandem( 'view' )
    };

    super(
      () => new NumberPlayModel(
        NumberPlayConstants.TEN,
        new Vector2( 58, 306 ), // empirically determined
        tandem.createTandem( 'model' )
      ),
      model => new NumberPlayScreenView( model, screenViewConfig ),
      screenOptions
    );
  }
}

numberPlay.register( 'TenScreen', TenScreen );
export default TenScreen;