import { nanoid } from "nanoid";
import { db } from "../database/server.js";
import shortenUrlSchema from "../models/shorten.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";

const shortenUrlValidation = async (req, res, next) => {
  const receivedUrl = req.body;
  let authToken = req.headers.authorization;

  if (authToken) {
    authToken = authToken.split(" ")[1];
  }

  try {
    const userSession = await db.query(
      "SELECT * FROM sessions WHERE token=$1",
      [authToken]
    );

    if (userSession.rowCount == 0) {
      res.status(401).send("Invalid authorization token");
      return;
    }

    const joiValidation = joiSchemaValidation(shortenUrlSchema, receivedUrl);

    if (joiValidation != "successfull") {
      res.status(422).send(joiValidation);
      return;
    }

    const shortUrl = nanoid();

    req.shortenObj = {
      url: receivedUrl.url,
      short_url: shortUrl,
      user_id: userSession.rows[0].user_id,
      visit_count: 0,
    };

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default shortenUrlValidation;
