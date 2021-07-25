import router from 'router';
import Post from './../model/post';

router.post('/0/create', async function (req, res) {
	const { data } = req.body;

	const post = await Post.create({
		data,
	});

	res.send(post);
});

router.get('/:id', function (req, res) {
});

router.post('/:id/update', function (req, res) {

});

export default router;