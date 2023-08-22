const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	p_isset: { type: Boolean, required: true },
	password: { type: String, required: true },
	type: { type: Number, required: true },
	name: { type: String, required: true },
	roll_no: { type: String },
	batch: { type: String }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d"
	});
	return token;
};

const User = mongoose.model("user", userSchema);

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



module.exports = { User, validate };
