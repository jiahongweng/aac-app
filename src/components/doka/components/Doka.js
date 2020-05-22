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

var isInt = function isInt(str) {
  return /^[0-9]+$/.test(str + '');
};

var Doka = (function (_React$Component) {
  _inherits(Doka, _React$Component);

  function Doka(props) {
    _classCallCheck(this, Doka);

    var _this = _possibleConstructorReturn(
      this,
      (Doka.__proto__ || Object.getPrototypeOf(Doka)).call(this, props),
    );

    _this._root = null;
    _this._instance = null;
    return _this;
  }

  _createClass(Doka, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._instance = (0, _createDoka.createDoka)(
          this,
          this._root,
          this.props,
        );
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        (0, _createDoka.updateDoka)(this._instance, this.props);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!this._instance) return;
        this._instance.destroy();
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
          width = _props.width,
          height = _props.height,
          children = _props.children;

        var styleWidth = isInt(width) ? width + 'px' : width || null;
        var styleHeight = isInt(height) ? height + 'px' : height || null;

        return _react2.default.createElement(
          'div',
          (0, _createDoka.propsToElementAttributes)(
            {
              className: 'Doka',
              style: { width: styleWidth, height: styleHeight },
            },
            this.props,
          ),
          _react2.default.createElement(
            'div',
            {
              ref: function ref(_ref) {
                return (_this2._root = _ref);
              },
            },
            children,
          ),
        );
      },
    },
  ]);

  return Doka;
})(_react2.default.Component);

exports.default = Doka;
