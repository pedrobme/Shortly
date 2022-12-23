import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(30).required(),
});

export default signInSchema;
