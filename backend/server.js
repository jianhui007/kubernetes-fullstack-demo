const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Connected to PostgreSQL successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on port ${port}`);
});
