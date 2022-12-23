import { db } from "../database/server.js";
import signInSchema from "../models/signin.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signinValidation = async (req, res, next) => {
  const receivedUser = req.body;

  const joiValidation = joiSchemaValidation(signInSchema, receivedUser);

  if (joiValidation != "successfull") {
    res.status(422).send(joiValidation);
    return;
  }

  try {
    const emailExists = await db.query("SELECT * FROM users WHERE email=$1", [
      receivedUser.email,
    ]);

    if (emailExists.rowCount == 0) {
      res.status(401).send("Email does not exists");
      return;
    }

    const passwordMatch = await bcrypt.compare(
      receivedUser.password,
      emailExists.rows[0].password
    );

    if (passwordMatch) {
      const sessionToken = uuid();

      await db.query("INSERT INTO sessions (user_id,token) VALUES ($1,$2)", [
        emailExists.rows[0].id,
        sessionToken,
      ]);
      res.status(200).send({ token: sessionToken });

      next();
      return;
    }

    res.status(422).send("Email and Password does not match");
    return;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default signinValidation;
