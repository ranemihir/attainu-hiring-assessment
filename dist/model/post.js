"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var POST_MAX_LENGTH = parseInt(process.env.POST_MAX_LENGTH);
var postSchema = new _mongoose["default"].Schema({
  data: {
    type: String,
    trim: true,
    "default": null,
    maxlength: POST_MAX_LENGTH
  }
});

var Post = _mongoose["default"].model('Post', postSchema);

var _default = Post;
exports["default"] = _default;