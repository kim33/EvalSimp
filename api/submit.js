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
    const {
      userId,
      passageId,
      understanding,
      naturalness,
      simplicity,
      fake_complex,
      improvement_suggestions,
      understanding_comment,
      naturalness_comment,
      simplicity_comment,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const query = `
      INSERT INTO responses (
        user_id,
        passage_id,
        understanding,
        naturalness,
        simplicity,
        fake_complex,
        improvement_suggestions,
        understanding_comment,
        naturalness_comment,
        simplicity_comment
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;

    const values = [
      userId,
      passageId,
      understanding,
      naturalness,
      simplicity,
      fake_complex,
      improvement_suggestions,
      understanding_comment,
      naturalness_comment,
      simplicity_comment,
    ];

    const result = await pool.query(query, values);
    res.status(200).send({ message: 'Responses saved successfully!', id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving responses:', error);
    res.status(500).send({ message: 'Error saving responses.' });
  }
};
