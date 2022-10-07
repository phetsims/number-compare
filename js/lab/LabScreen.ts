// Copyright 2019-2022, University of Colorado Boulder

/**
 * The 'Lab' screen.
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import labScreenIcon_png from '../../images/labScreenIcon_png.js';
import NumberPlayColors from '../../../number-play/js/common/NumberPlayColors.js';
import NumberPlayStrings from '../../../number-play/js/NumberPlayStrings.js';
import LabModel from '../../../number-play/js/lab/model/LabModel.js';
import LabScreenView from '../../../number-play/js/lab/view/LabScreenView.js';
import { SymbolType } from '../../../number-play/js/lab/view/SymbolCardNode.js';
import numberCompare from '../numberCompare.js';

class LabScreen extends Screen<LabModel, LabScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: NumberPlayStrings.screen.labStringProperty,
      backgroundColorProperty: NumberPlayColors.lightPurpleBackgroundColorProperty,
      homeScreenIcon: new ScreenIcon( new Image( labScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    };

    super(
      () => new LabModel(
        tandem.createTandem( 'model' ) ),
      ( model: LabModel ) => new LabScreenView( model, [ '<', '>', '=', '+', '-' ], tandem.createTandem( 'view' ) ),
      options
    );
  }
}

numberCompare.register( 'LabScreen', LabScreen );
export default LabScreen;