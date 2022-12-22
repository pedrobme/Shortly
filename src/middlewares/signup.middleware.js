import { db } from "../database/server.js";
import signUpSchema from "../models/signup.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";

const signupValidation = async (req, res, next) => {
  const receivedUser = req.body;

  const joiValidation = joiSchemaValidation(signUpSchema, receivedUser);

  if (joiValidation != "successfull") {
    res.status(422).send(joiValidation);
    return;
  }

  try {
    const emailIsUsed = await db.query("SELECT * FROM users WHERE email=$1", [
      receivedUser.email,
    ]);

    if (emailIsUsed.rowCount != 0) {
      res.status(409).send("This email is already in use");
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }

  next();
};

export default signupValidation;
