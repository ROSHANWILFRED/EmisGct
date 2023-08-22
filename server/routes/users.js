const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user) {
			console.log("User Exits already:", user.email);
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		console.log("User Created Successfully", req.body.email);
		res
			.status(201)
			.send({ message: "User created successfully", status: true });
	} catch (error) {
		console.log(error);

		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;
