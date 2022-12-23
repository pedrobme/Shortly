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
