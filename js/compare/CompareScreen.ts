// Copyright 2019-2022, University of Colorado Boulder

/**
 * The 'Compare' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import compareScreenIcon_png from '../../images/compareScreenIcon_png.js';
import CompareModel from './model/CompareModel.js';
import CompareScreenView from './view/CompareScreenView.js';
import NumberPlayQueryParameters from '../../../number-play/js/common/NumberPlayQueryParameters.js';
import NumberCompareStrings from '../NumberCompareStrings.js';
import numberCompare from '../numberCompare.js';
import NumberCompareColors from '../common/NumberCompareColors.js';

class CompareScreen extends Screen<CompareModel, CompareScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: NumberCompareStrings.screen.compareStringProperty,
      backgroundColorProperty: NumberCompareColors.whiteBackgroundColorProperty,
      homeScreenIcon: new ScreenIcon( new Image( compareScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    };

    super(
      () => new CompareModel(
        NumberPlayQueryParameters.compareMax,
        tandem.createTandem( 'model' ) ),
      model => new CompareScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

numberCompare.register( 'CompareScreen', CompareScreen );
export default CompareScreen;