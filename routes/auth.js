import bcrypt from 'bcryptjs';
import express from 'express';
import router from 'router';
import User from './../model/user';

async function authenticate(req, res, next) {
	try {
		const { username, password } = req.body;

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			username: username.toLowerCase(),
			password: encryptedPassword,
			token
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
}

router.post('/admin', authenticate);
router.post('/student', authenticate);

export default router;