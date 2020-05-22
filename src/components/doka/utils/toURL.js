/* eslint-disable */ 'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
// Turn src into url for use in image tag
var toURL = (exports.toURL = function toURL(src) {
  return src instanceof Blob ? URL.createObjectURL(src) : src;
});
