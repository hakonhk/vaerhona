import { isClient } from './utils';

var Hammer;
if (isClient) {
  Hammer = require('hammerjs');
}

export default Hammer;
