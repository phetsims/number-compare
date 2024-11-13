/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;