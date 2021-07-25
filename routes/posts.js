import router from 'router';
import Post from './../model/post';

const POST_MAX_LENGTH = process.env.POST_MAX_LENGTH;

router.post('/0/create', async function (req, res, next) {
	const { data } = req.body;

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
	} catch {
		console.error(err);
		next(error);
	}
});

router.get('/:id', async function (req, res, next) {
	const id = req.params.id;

	try {
		const post = await Post.findById(id).exec();
		return res.send(post);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.post('/:id/update', async function (req, res, next) {
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
		next(err);
	}
});

export default router;