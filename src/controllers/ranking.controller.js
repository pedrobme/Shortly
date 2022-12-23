import { db } from "../database/server.js";

export const getVisitCountRaking = async (req, res) => {
  try {
    const visitCountRanking = await db.query(
      'SELECT users.id, users.name, count(urls.url) as "linksCount", sum(urls.visit_count) as "visitCount" FROM users JOIN urls ON users.id=urls.user_id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;'
    );

    res.status(200).send(visitCountRanking.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
