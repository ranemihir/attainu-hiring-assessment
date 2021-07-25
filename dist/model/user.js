"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    "enum": ['STUDENT', 'ADMIN'],
    "default": 'STUDENT'
  }
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;