/* eslint-disable */ 'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createDoka = require('../utils/createDoka');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var DokaModal = (function (_React$Component) {
  _inherits(DokaModal, _React$Component);

  function DokaModal(props) {
    _classCallCheck(this, DokaModal);

    var _this = _possibleConstructorReturn(
      this,
      (DokaModal.__proto__ || Object.getPrototypeOf(DokaModal)).call(
        this,
        props,
      ),
    );

    _this._instance = null;
    return _this;
  }

  _createClass(DokaModal, [
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.hide();
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.update();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.update();
      },
    },
    {
      key: 'update',
      value: function update() {
        var enabled = this.props.enabled;

        if (enabled || typeof enabled === 'undefined') {
          this.show();
        } else {
          this.hide();
        }
      },
    },
    {
      key: 'show',
      value: function show() {
        var _this2 = this;

        // handle closing of the instance ourself
        var options = Object.assign({}, this.props, {
          allowAutoClose: false,
          onclose: function onclose() {
            _this2._instance.destroy();
            _this2._instance = null;
          },
        });

        // update existing instance
        if (this._instance) {
          return (0, _createDoka.updateDoka)(this._instance, options);
        }

        // no instance yet, create a new one (no root supplied, it's added to the <body>)
        this._instance = (0, _createDoka.createDoka)(this, null, options);
      },
    },
    {
      key: 'hide',
      value: function hide() {
        if (!this._instance) return;
        this._instance.close();
      },
    },
    {
      key: 'render',
      value: function render() {
        return null;
      },
    },
  ]);

  return DokaModal;
})(_react2.default.Component);

exports.default = DokaModal;
