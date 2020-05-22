/* eslint-disable */ 'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createDoka = exports.updateDoka = exports.propsToElementAttributes = undefined;

var _dokaEsm = require('../lib/doka.esm.min');

// Test if Doka is supported on this environment
var isSupported = (0, _dokaEsm.supported)();

// These keys are removed before passing options to Doka
var filteredKeys = ['id', 'className'];

// filtered methods
var filteredMethods = [
  'setOptions',
  'on',
  'off',
  'onOnce',
  'appendTo',
  'insertAfter',
  'insertBefore',
  'isAttachedTo',
  'replaceElement',
  'restoreElement',
  'destroy',
];

// These are the allowed props
var allowedProps = Object.keys(_dokaEsm.OptionTypes).filter(function (key) {
  return !filteredKeys.includes(key);
});

var propsToElementAttributes = (exports.propsToElementAttributes = function propsToElementAttributes() {
  var base =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var id = _ref.id,
    style = _ref.style,
    className = _ref.className;

  return {
    id: base.id || id,
    className: base.className
      .split(' ')
      .concat(className)
      .filter(function (n) {
        return n;
      })
      .join(' '),
    style: Object.assign({}, base.style || {}, style || {}),
  };
});

var getOptionsFromProps = function getOptionsFromProps(props, filter) {
  return Object.keys(props)
    .filter(function (prop) {
      return filter
        ? allowedProps.find(function (key) {
            return key.toLowerCase() === prop.toLowerCase();
          })
        : true;
    })
    .reduce(function (options, key) {
      options[/^on/.test(key) ? key.toLocaleLowerCase() : key] = props[key];
      return options;
    }, {});
};

var updateDoka = (exports.updateDoka = function updateDoka(instance, props) {
  return instance.setOptions(getOptionsFromProps(props, true));
});

// Create a new Doka instance based on supplied props and root element
var createDoka = (exports.createDoka = function createDoka(component, root) {
  var props =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!isSupported) return;

  // method hook
  component.doka = {};

  // params will be passed to the Doka create method
  var params = [getOptionsFromProps(props, root !== null)];

  // prepend the root element if it was supplied
  if (root) {
    params.unshift(root);
  }

  // create our Doka instance
  var instance = _dokaEsm.create.apply(undefined, params);

  // reference Doka methods to component instance (they are placed on the `doka` property to prevent collisions)
  Object.keys(instance)
    .filter(function (key) {
      return !filteredMethods.includes(key);
    })
    .forEach(function (key) {
      return (component.doka[key] = instance[key]);
    });

  return instance;
});
