'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
	username: {
		type: String
	},
	encryptedPassword: {
		type: String
	},
	token: {
		type: String
	},
	role: {
		type: String,
		enum: ['STUDENT', 'ADMIN'],
		default: 'STUDENT'
	}
});

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;