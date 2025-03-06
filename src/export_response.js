const { Pool } = require("pg");
const fs = require("fs");
const fastcsv = require("fast-csv");
require("dotenv").config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const exportToCSV = async () => {
  try {
    const result = await pool.query('SELECT * FROM responses'); // Change table name as needed

    const ws = fs.createWriteStream('/data/horse/ws/kyim310f-cms-pro/surve-app/result/sample.csv');
    
    fastcsv
      .write(result.rows, { headers: true })
      .pipe(ws);

    console.log("Data has been written to the CSV file successfully.");
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
  }
};

exportToCSV();
