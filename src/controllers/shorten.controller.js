import { db } from "../database/server.js";

const insertOneUrl = async (req, res) => {
  const shortenObj = req.shortenObj;

  try {
    await db.query(
      "INSERT INTO urls (url, short_url, visit_count, user_id) VALUES ($1,$2,$3,$4)",
      [
        shortenObj.url,
        shortenObj.short_url,
        shortenObj.visit_count,
        shortenObj.user_id,
      ]
    );

    res.status(201).send(shortenObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default insertOneUrl;
