'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _user = require('./../model/user');

var _user2 = _interopRequireDefault(_user);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var TOKEN_KEY = process.env.TOKEN_KEY;

async function authenticate(req, res) {
	try {
		var _req$body = req.body,
		    username = _req$body.username,
		    password = _req$body.password;

		var encryptedPassword = await _bcryptjs2.default.hash(password, 10);

		var findUser = await _user2.default.find({ username: username }).exec();

		if (findUser && !findUser.encryptedPassword == encryptedPassword) {
			return res.status(403).send('Incorrect password provided for username: ' + username);
		}

		var token = jwt.sign({ username: username, encryptedPassword: encryptedPassword }, TOKEN_KEY, {
			expiresIn: '2h'
		});

		var role = 'STUDENT';

		if (req.path.endsWith('/admin')) {
			role = 'ADMIN';
		}

		var user = await _user2.default.create({
			username: username.toLowerCase(),
			password: encryptedPassword,
			token: token,
			role: role
		});

		await user.save(function (err) {
			if (err) {
				console.error(err);
			}
		});

		res.send({
			token: token
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
}

router.post('/admin', authenticate);
router.post('/student', authenticate);

exports.default = router;