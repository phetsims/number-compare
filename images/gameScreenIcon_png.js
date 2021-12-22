/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;