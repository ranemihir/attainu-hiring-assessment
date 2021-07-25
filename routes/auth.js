import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import router from 'router';
import User from './../model/user';

const TOKEN_KEY = process.env.TOKEN_KEY;

async function authenticate(req, res, next) {
	try {
		const { username, password } = req.body;
		const encryptedPassword = await bcrypt.hash(password, 10);
		const token = jwt.sign({ username, encryptedPassword }, TOKEN_KEY, {
			expiresIn: '2h',
		});

		var role = 'STUDENT';

		if (req.path.endsWith('/admin')) {
			role = 'ADMIN';
		}

		const user = await User.create({
			username: username.toLowerCase(),
			password: encryptedPassword,
			token,
			role
		});

		await user.save(function (err) {
			if (err) {
				console.error(err);
			}
		});

		res.send({
			token,
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
}

router.post('/admin', authenticate);
router.post('/student', authenticate);

export default router;