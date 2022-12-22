import { db } from "../database/server.js";

const signupTest = async (req, res) => {
  const signupParams = req.body;

  console.log(signupParams);
  try {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
      [signupParams.name, signupParams.email, signupParams.password]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default signupTest;
