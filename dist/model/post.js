'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POST_MAX_LENGTH = parseInt(process.env.POST_MAX_LENGTH);

var postSchema = new _mongoose2.default.Schema({
	data: {
		type: String,
		trim: true,
		default: null,
		maxlength: POST_MAX_LENGTH
	}
});

var Post = _mongoose2.default.model('Post', postSchema);

exports.default = Post;