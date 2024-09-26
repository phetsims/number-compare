// Copyright 2022-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
/* @formatter:off */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import numberCompare from './numberCompare.js';

type StringsType = {
  'number-compare': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'compareStringProperty': LocalizedStringProperty;
  };
  'isLessThanStringProperty': LocalizedStringProperty;
  'isGreaterThanStringProperty': LocalizedStringProperty;
  'isEqualToStringProperty': LocalizedStringProperty;
  'automaticallyHearNumberSentenceStringProperty': LocalizedStringProperty;
  'automaticallyHearNumberSentenceDescriptionStringProperty': LocalizedStringProperty;
};

const NumberCompareStrings = getStringModule( 'NUMBER_COMPARE' ) as StringsType;

numberCompare.register( 'NumberCompareStrings', NumberCompareStrings );

export default NumberCompareStrings;
