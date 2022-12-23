import { db } from "../database/server.js";

export const insertOneUrl = async (req, res) => {
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

export const selectOneUrlById = async (req, res) => {
  const params = req.params;

  try {
    const urlSelect = await db.query(
      'SELECT id,url,short_url as "shortUrl" FROM urls WHERE id=$1',
      [params.id]
    );

    if (urlSelect.rowCount == 0) {
      res.status(404).send("Url does not exists");
      return;
    }

    res.status(200).send(urlSelect.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const shortUrlRedirect = async (req, res) => {
  const params = req.params;

  try {
    const urlSelect = await db.query("SELECT * FROM urls WHERE short_url=$1", [
      params.shortUrl,
    ]);

    if (urlSelect.rowCount == 0) {
      res.status(404).send("Url does not exists");
      return;
    }

    await db.query("UPDATE urls SET visit_count=$1 WHERE short_url=$2", [
      urlSelect.rows[0].visit_count + 1,
      params.shortUrl,
    ]);

    res.redirect(urlSelect.rows[0].url);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteOneUrl = async (req, res) => {
  const params = req.params;
  let authToken = req.headers.authorization;

  if (authToken) {
    authToken = authToken.split(" ")[1];
  }

  try {
    const urlSelect = await db.query("SELECT * FROM urls WHERE id=$1", [
      params.id,
    ]);

    if (urlSelect.rowCount == 0) {
      res.status(404).send("Url does not exists");
      return;
    }

    const userSession = await db.query(
      "SELECT * FROM sessions WHERE token=$1",
      [authToken]
    );

    if (userSession.rowCount == 0) {
      res.status(401).send("Invalid authorization token");
      return;
    }

    const userIsUrlOwner = await db.query(
      "SELECT * FROM urls WHERE user_id=$1 AND id=$2;",
      [userSession.rows[0].user_id, params.id]
    );

    if (userIsUrlOwner.rowCount == 0) {
      res.status(401).send("User don't own this url");
      return;
    }

    await db.query("DELETE from urls WHERE id=$1", [params.id]);

    res.status(204).send("Url deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
