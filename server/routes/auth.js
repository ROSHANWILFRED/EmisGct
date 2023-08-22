const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/tokenauth");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);

		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			console.log("Login Error");
			return res
				.status(401)
				.send({ message: "Invalid Email or Password", status: false });
		}
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res
				.status(401)
				.send({ message: "Invalid Email or Password", status: false });

		const token = user.generateAuthToken();
		res.status(200).send({
			data: token,
			message: "logged in successfully",
			status: true,
			type: user.type,
			p_isset: user.p_isset
		});
		console.log("User logged in: ", req.body.email);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error", status: false });
	}
});

router.post("/reset", authenticateToken, async (req, res) => {
	const { error } = validataReset(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const userId = req.userId;
	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.newpassword, salt);
	try {
		const user = await User.updateOne(
			{ _id: userId },
			{ p_isset: req.body.status, password: hashPassword }
		);
		res
			.status(200)
			.send({ message: "Password Changed Successfully", status: true });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error", status: false });
	}
});

const customEmailValidator = Joi.string()
	.required()
	.custom((value, helpers) => {
		if (value.endsWith("@gct.ac.in")) {
			return value; // Valid email
		} else {
			return helpers.error("any.invalid");
		}
	}, "Custom Email Validation");

const validate = (data) => {
	const schema = Joi.object({
		email: customEmailValidator,
		password: Joi.string().required().label("Password")
	});
	return schema.validate(data);
};

const validataReset = (data) => {
	const schema = Joi.object({
		newpassword: Joi.string().required().label("NewPassword"),
		status: Joi.bool().required().label("status")
	});
	return schema.validate(data);
};

module.exports = router;
