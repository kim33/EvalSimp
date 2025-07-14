const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5009;

// PostgreSQL pool connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'survey_db',
  password: 'postgres',
  port: 5432,
});
app.use(cors({
  origin: 'http://localhost:5004',
  methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

// Get the next uncompleted passage
app.get('/api/passages/next', async (req, res) => {
  const userId = req.query.user_id;
  try {

    await pool.query(
      `INSERT INTO phase2_users (id) VALUES ($1) ON CONFLICT DO NOTHING`,
      [userId]
    );

    const assigned = await pool.query(
      `SELECT COUNT(*) FROM phase2_user_passages WHERE user_id = $1`,
      [userId]
    );

    if (parseInt(assigned.rows[0].count) === 0) {
      // Select up to 7 passages not assigned to anyone yet
      const unassignedPassages = await pool.query(`
        SELECT id FROM updated_passages
        WHERE id NOT IN (
          SELECT passage_id FROM phase2_user_passages
        )
        ORDER BY id
        LIMIT 8
      `);

      const insertValues = unassignedPassages.rows
        .map((row) => `('${userId}', ${row.id})`)
        .join(',');

      if (insertValues) {
        await pool.query(
          `INSERT INTO phase2_user_passages (user_id, passage_id) VALUES ${insertValues}`
        );
      }
    }

    // Step 3: Get the next passage the user hasn't completed
    const nextPassage = await pool.query(`
      SELECT p.*
      FROM updated_passages p
      JOIN phase2_user_passages up ON p.id = up.passage_id
      WHERE up.user_id = $1
      AND NOT EXISTS (
        SELECT 1 FROM final_simplified_summary fs
        WHERE fs.user_id = $1 AND fs.passage_id = p.id
      )
      LIMIT 1
    `, [userId]);


    if (nextPassage.rows.length === 0) {
      return res.json({ done: true });
    }
    if (nextPassage.rows.length > 0) {
      const passageId = nextPassage.rows[0].id;

      // Record the start time if it's not already set
      await pool.query(`
        UPDATE phase2_user_passages
        SET started_at = NOW()
        WHERE user_id = $1 AND passage_id = $2 AND started_at IS NULL
      `, [userId, passageId]);

      return res.json(nextPassage.rows[0]);
    }

  } catch (err) {
    console.error('Error fetching next passage:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
    /*** 
     * const result = await pool.query(
      `SELECT * FROM updated_passages WHERE completed = FALSE LIMIT 1`
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'No more passages to simplify.' });
        }
        res.json(result.rows[0]);
      } catch (err) {
        console.error('Error fetching next passage:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    );*/
    
    

// Submit simplified summary
// POST: Submit simplified summary to a different table
app.post('/api/passages/submit', async (req, res) => {
  const { user_id, passage_id, summary } = req.body;

  if (!user_id || !passage_id || !summary) {
    return res.status(400).json({ error: 'Missing user_id, passage_id or summary' });
  }

  try {
    // Save submission
    await pool.query(
      `INSERT INTO final_simplified_summary (user_id, passage_id, summary)
       VALUES ($1, $2, $3)`,
      [user_id, passage_id, summary]
    );

    await pool.query(`
      UPDATE phase2_user_passages
      SET submitted_at = NOW()
      WHERE user_id = $1 AND passage_id = $2
    `, [userId, passageId]);

    res.json({ message: 'Summary saved successfully.' });
  } catch (err) {
    console.error('Error saving summary:', err);
    res.status(500).json({ error: 'Failed to save summary' });
  }
});
/*** 
app.post('/api/passages/submit', async (req, res) => {
  const { id, summary } = req.body;

  if (!id || !summary) {
    return res.status(400).json({ error: 'Missing passage ID or summary' });
  }

  try {
    await pool.query(
      `INSERT INTO final_simplified_summary (passage_id, summary)
       VALUES ($1, $2)`,
      [id, summary]
    );
    await pool.query(
      `UPDATE updated_passages SET completed = TRUE WHERE id = $1`,
      [id]
    );
    res.json({ message: 'Summary saved successfully.' });
  } catch (err) {
    console.error('Error saving summary:', err);
    res.status(500).json({ error: 'Failed to save summary' });
  }
});
*/

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
