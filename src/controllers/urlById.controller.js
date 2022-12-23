import { db } from "../database/server.js";

const selectOneUrlById = async (req, res) => {
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

export default selectOneUrlById;
