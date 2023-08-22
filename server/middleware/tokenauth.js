const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: "Failed to authenticate token" });
		}

		req.userId = decoded._id; // Store the user ID from the token payload
		next();
	});
};

module.exports = authenticateToken;