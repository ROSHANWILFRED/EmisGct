const Joi = require("joi");
const authenticateToken = require("../middleware/tokenauth");
const { User } = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/getstudents", authenticateToken, async (req, res) => {
	try {
		const userId = req.userId;
		const user = await User.findOne({ _id: userId });
		if (user.type !== 2) {
			res.status(401).send({ message: "Not Authorized", status: false });
			return;
		}
		const userList = await User.find({ type: 0 });
		res.status(200).send({ data: userList, status: true });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/getstaffs", authenticateToken, async (req, res) => {
	try {
		const userId = req.userId;
		const user = await User.findOne({ _id: userId });
		if (user.type !== 2) {
			res.status(401).send({ message: "Not Authorized", status: false });
			return;
		}
		const userList = await User.find({ type: 1 });
		res.status(200).send({ data: userList, status: true });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/getadmins", authenticateToken, async (req, res) => {
	try {
		const userId = req.userId;
		const user = await User.findOne({ _id: userId });
		if (user.type !== 2) {
			res.status(401).send({ message: "Not Authorized", status: false });
			return;
		}
		const userList = await User.find({ type: 2 });
		res.status(200).send({ data: userList, status: true });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/bulkusers", authenticateToken, async (req, res) => {
	try {
		const userId = req.userId;
		const user = await User.findOne({ _id: userId });
		if (user.type !== 2) {
			res.status(401).send({ message: "Not Authorized", status: false });
			return;
		}

		const users = req.body.users; // Assuming you send an array of users in the request body

		// Validate each user in the list
		for (const user of users) {
			const { error } = validate(user);
			if (error) {
				return res.status(400).send({ message: error.details[0].message });
			}
		}

		const existingEmails = await User.find({
			email: { $in: users.map((user) => user.email) }
		});

		const duplicateEmails = existingEmails.map((user) => user.email);

		if (duplicateEmails.length > 0) {
			return res.status(409).send({
				message:
					"Users with these emails already exist: " + duplicateEmails.join(", ")
			});
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));

		const usersToInsert = await Promise.all(
			users.map(async (user) => {
				const hashPassword = await bcrypt.hash(user.password, salt);
				return {
					...user,
					password: hashPassword
				};
			})
		);

		await User.insertMany(usersToInsert);

		const insertedEmails = usersToInsert.map((user) => user.email);
		console.log("Users Created Successfully:", insertedEmails);

		res
			.status(200)
			.send({ message: "Users created successfully", status: true });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
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
		password: Joi.string().required().label("Password"),
		p_isset: Joi.boolean().required().label("is_set"),
		type: Joi.number().required().label("type"),
		name: Joi.string().required().label("name"),
		roll_no: Joi.string().label("rollno"),
		batch: Joi.string().label("batch")
	});
	return schema.validate(data);
};

module.exports = router;
