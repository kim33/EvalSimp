const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();  // Make sure this is at the top of your file

const app = express();
const port = process.env.PORT || 5004;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err));

app.use(cors());

  

app.use(express.json());

// Route for the root URL (optional)
app.get("/", (req, res) => {
  res.send("Server is running...");
});


// Route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    console.log("Received data: ", req.body);
    const { userId, passageId, understanding, naturalness, simplicity, understanding_comment, naturalness_comment, simplicity_comment, complex_a, complex_b} = req.body;

    if (!userId) {
      return res.status(400).json({message : "User ID is required"});
    }
    // Insert the data into the PostgreSQL responses table
    const query = `
      INSERT INTO responses (
        user_id, 
        passage_id,
        understanding,
        naturalness,
        simplicity,
        understanding_comment,
        naturalness_comment,
        simplicity_comment,
        complex_a,
        complex_b
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;

    const values = [
      userId,
      passageId,
      understanding,
      naturalness,
      simplicity,
      understanding_comment,
      naturalness_comment,
      simplicity_comment,
      complex_a,
      complex_b
    ];

    const result = await pool.query(query, values);
    res.status(200).send({ message: "Responses saved successfully!", id: result.rows[0].id });
  } catch (error) {
    console.error("Error saving responses:", error);
    res.status(500).send({ message: "Error saving responses." });
  }
});

app.get("/get-passage/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log("Fetching passage for user_id:", user_id);

    // Ensure user_id is correctly received and converted to an integer
    const numericUserId = parseInt(user_id, 10);
    if (isNaN(numericUserId)) {
      console.error("Invalid user_id received:", user_id);
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the user's assigned survey set
    const surveySetResult = await pool.query(
      "SELECT survey_set_id FROM user_assignments WHERE user_id = $1",
      [numericUserId]
    );
    console.log("Survey set result:", surveySetResult.rows); 

    if (surveySetResult.rows.length === 0) {
      console.error("User not assigned to any survey set.");
      return res.status(404).json({ error: "User not assigned to any survey set." });
    }

    const surveySetId = surveySetResult.rows[0].survey_set_id;
    console.log("Assigned survey set ID:", surveySetId);

    // Get a random passage from the assigned survey set
    const passageResult = await pool.query(
      "SELECT passages.* FROM passages " +
      "INNER JOIN survey_set_passages ON passages.id = survey_set_passages.passage_id " +
      "WHERE survey_set_passages.survey_set_id = (SELECT survey_set_id FROM user_assignments WHERE user_id = $1) AND passages.id NOT IN (SELECT passage_id FROM responses WHERE user_id = $1) " +
      "LIMIT 1",
      [numericUserId]
    );

    console.log("Passage result:", passageResult.rows);

    if (passageResult.rows.length === 0) {
      console.error("No passages found for this survey set.");
      return res.status(404).json({ error: "No passages found for this survey set." });
    }

    res.json(passageResult.rows[0]);

  } catch (error) {
    console.error("Error fetching passage:", error);
    res.status(500).json({ error: "Error fetching passage", details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
