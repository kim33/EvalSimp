const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

module.exports = async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log('Fetching passage for user_id:', user_id);

    const numericUserId = parseInt(user_id, 10);
    if (isNaN(numericUserId)) {
      console.error('Invalid user_id received:', user_id);
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const surveySetResult = await pool.query(
      'SELECT survey_set_id FROM user_assignments WHERE user_id = $1',
      [numericUserId]
    );
    if (surveySetResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not assigned to any survey set.' });
    }

    const surveySetId = surveySetResult.rows[0].survey_set_id;
    const passageResult = await pool.query(
      `SELECT passages.* FROM passages
      JOIN survey_set_passages ON passages.id = survey_set_passages.passage_id
      WHERE survey_set_passages.survey_set_id = $1
      ORDER BY RANDOM() LIMIT 1`,
      [surveySetId]
    );

    if (passageResult.rows.length === 0) {
      return res.status(404).json({ error: 'No passages found for this survey set.' });
    }

    res.json(passageResult.rows[0]);
  } catch (error) {
    console.error('Error fetching passage:', error);
    res.status(500).json({ error: 'Error fetching passage', details: error.message });
  }
};
