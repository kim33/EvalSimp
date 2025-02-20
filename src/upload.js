const xlsx = require("xlsx");
const { Pool } = require("pg");
const path = require('path');
require("dotenv").config();

// PostgreSQL database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});
async function uploadExcelToDB(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  for (let i = 0; i < data.length; i++) {
    const { Passage_A, Passage_B, fake_complex} = data[i];

    if (Passage_A && Passage_B && fake_complex) {
      await pool.query(
        "INSERT INTO passages (passage_a, passage_b, fake_complex) VALUES ($1, $2, $3)",
        [Passage_A, Passage_B, fake_complex]
      );
    }
  }

  console.log("Data uploaded successfully!");
}

// Specify the path to your Excel file (use path.join for correct file resolution)
const filePath = path.join(__dirname, '../original_simplified_pairs.xlsx'); // Adjust path

// Run the function
uploadExcelToDB(filePath)
  .then(() => {
    console.log("Upload completed.");
    pool.end(); // Close the database connection
  })
  .catch((error) => {
    console.error("Error:", error);
    pool.end(); // Ensure the connection is closed even on error
  });
