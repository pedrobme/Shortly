import { db } from "../database/server.js";
import bcrypt from "bcrypt";

const insertOneUser = async (req, res) => {
  const receivedUser = req.body;

  console.log(receivedUser);

  const hashedPassword = bcrypt.hashSync(receivedUser.password, 12);
  try {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
      [receivedUser.name, receivedUser.email, hashedPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default insertOneUser;
