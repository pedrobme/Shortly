import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email(),
  password: joi.string().min(3).max(30).required(),
  confirmPassword: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export default signUpSchema;
