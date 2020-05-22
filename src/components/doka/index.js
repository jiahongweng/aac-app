/* eslint-disable */ 'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isSupported = exports.toURL = exports.DokaModal = exports.DokaOverlay = exports.Doka = undefined;

var _dokaEsm = require('./lib/doka.esm.min');

require('./lib/doka.min.css');

var _Doka = require('./components/Doka');

var _Doka2 = _interopRequireDefault(_Doka);

var _DokaOverlay = require('./components/DokaOverlay');

var _DokaOverlay2 = _interopRequireDefault(_DokaOverlay);

var _DokaModal = require('./components/DokaModal');

var _DokaModal2 = _interopRequireDefault(_DokaModal);

var _toURL = require('./utils/toURL');

require('./index.css');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Test if Doka is supported on this environment

// Utils
var isSupported = (0, _dokaEsm.supported)();

// Import Styles for React Components

// Import Doka React Components
// Import Doka itself
exports.Doka = _Doka2.default;
exports.DokaOverlay = _DokaOverlay2.default;
exports.DokaModal = _DokaModal2.default;
exports.toURL = _toURL.toURL;
exports.isSupported = isSupported;
