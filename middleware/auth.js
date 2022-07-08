const config = require('config');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

	const token = req.header('x-auth-token');

	//Check if no token
	if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
	
		try {
		//Verify token
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		//Add user to request object
		req.user = decoded;
		next();
	} catch (err) {
		res.status(400).json({ message: 'Token is not valid' });
	}
}

module.exports = auth;