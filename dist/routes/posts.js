'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _post = require('./../model/post');

var _post2 = _interopRequireDefault(_post);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var POST_MAX_LENGTH = process.env.POST_MAX_LENGTH;
var TOKEN_KEY = process.env.TOKEN_KEY;

router.use(async function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send('Token is not present');
	}

	try {
		var decoded = jwt.verify(token, TOKEN_KEY);

		console.log('decoded =>', decoded);
	} catch (err) {
		return res.status(401).send('Invalid token: ' + token);
	}

	return next();
});

router.post('/0/create', async function (req, res) {
	var data = req.body.data;


	if (!data) {
		return res.status(403).send('Post data property cannot be empty');
	}

	if (data.length > POST_MAX_LENGTH) {
		return res.status(403).send('Post length exceeds the max length of ' + POST_MAX_LENGTH);
	}

	try {
		var post = await _post2.default.create({
			data: data
		});

		await post.save(function (err) {
			if (err) {
				console.error(err);
			}
		});

		return res.send(post);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

router.get('/:id', async function (req, res) {
	var id = req.params.id;

	try {
		var post = await _post2.default.findById(id).exec();
		return res.send(post);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/:id/update', async function (req, res) {
	var _id = req.params.id;
	var data = req.body.data;


	if (data.length > POST_MAX_LENGTH) {
		res.status(403).send('Post length exceeds the max length of ' + POST_MAX_LENGTH);
	}

	try {
		var post = await _post2.default.findOneAndUpdate({
			_id: _id
		}, {
			data: data
		}, {
			new: true
		});

		return res.send(post);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

exports.default = router;