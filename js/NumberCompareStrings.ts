// Copyright 2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import numberCompare from './numberCompare.js';

type StringsType = {
  'number-compare': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'screen': {
    'compare': string;
    'compareStringProperty': LinkableProperty<string>;
  };
  'isLessThan': string;
  'isLessThanStringProperty': LinkableProperty<string>;
  'isMoreThan': string;
  'isMoreThanStringProperty': LinkableProperty<string>;
  'isEqualTo': string;
  'isEqualToStringProperty': LinkableProperty<string>;
  'readAloud': string;
  'readAloudStringProperty': LinkableProperty<string>;
};

const NumberCompareStrings = getStringModule( 'NUMBER_COMPARE' ) as StringsType;

numberCompare.register( 'NumberCompareStrings', NumberCompareStrings );

export default NumberCompareStrings;
