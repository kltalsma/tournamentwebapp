const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Existing tournaments route
router.get('/', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM tournaments');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// New route to add tournament configuration
// Add tournament configuration route
// Create a new tournament
router.post('/', async (req, res) => {
  console.log('Received request to create a tournament:', req.body);
  
  const { numTeams, numPoules, numCourts, matchTime, startTime, tournamentDuration } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tournaments (num_teams, num_poules, num_courts, match_time, start_time, tournament_duration)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [numTeams, numPoules, numCourts, matchTime, startTime, tournamentDuration]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tournament:', error);
    res.status(500).send(error.message);
  }
});


module.exports = router;

