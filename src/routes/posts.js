import Post from './../model/post';
import express from 'express';
import * as jwt from 'jsonwebtoken';
import User from './../model/user';
const router = express.Router();

const POST_MAX_LENGTH = process.env.POST_MAX_LENGTH;
const TOKEN_KEY = process.env.TOKEN_KEY;

router.use(async function (req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send('Token is not present');
	}

	try {
		const { username } = jwt.verify(token, TOKEN_KEY);
		const user = await User.findOne({ username }).exec();
		req.user = user;
	} catch (err) {
		return res.status(401).send(`Invalid token: ${token}`);
	}

	return next();
});

router.post('/0/create', async function (req, res) {
	if (req.user.role != 'ADMIN') {
		return res.status(403).send('User does not have the permissions to create');
	}

	const { data } = req.body;

	if (!data) {
		return res.status(403).send('Post data property cannot be empty');
	}

	if (data.length > POST_MAX_LENGTH) {
		return res.status(403).send(`Post length exceeds the max length of ${POST_MAX_LENGTH}`);
	}

	try {
		const post = await Post.create({
			data,
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
	const id = req.params.id;

	try {
		const post = await Post.findById(id).exec();
		return res.send(post);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/:id/update', async function (req, res) {
	if (req.user.role != 'ADMIN') {
		return res.status(403).send('User does not have the permissions to update');
	}

	const _id = req.params.id;
	const { data } = req.body;

	if (data.length > POST_MAX_LENGTH) {
		res.status(403).send(`Post length exceeds the max length of ${POST_MAX_LENGTH}`);
	}

	try {
		const post = await Post.findOneAndUpdate({
			_id
		}, {
			data,
		}, {
			new: true
		});

		return res.send(post);
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

export default router;