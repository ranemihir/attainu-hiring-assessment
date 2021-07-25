import * as jwt from 'jsonwebtoken';

const TOKEN_KEY = process.env.TOKEN_KEY;

export default async function (req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send('Token is not present');
	}
	
	try {
		const decoded = jwt.verify(token, TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send(`Invalid token: ${token}`);
	}

	return next();
}