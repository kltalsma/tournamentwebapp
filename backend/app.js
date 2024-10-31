// backend/app.js
const express = require('express');
const app = express();

// Use Express's built-in JSON parser
app.use(express.json());

// CORS Middleware
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Simple in-memory storage for demonstration
const tournaments = [];

app.post('/api/tournament', (req, res) => {
  const { numTeams, numPoules, numCourts, matchTime, startTime, tournamentDuration } = req.body;
  if (!numTeams || !numPoules || !numCourts || !matchTime || !startTime || !tournamentDuration) {
    return res.status(400).send('Invalid input');
  }
  const newTournament = {
    id: tournaments.length + 1,
    numTeams,
    numPoules,
    numCourts,
    matchTime,
    startTime,
    tournamentDuration,
    matches: [],
  };
  tournaments.push(newTournament);
  res.status(201).send(newTournament);
});

app.get('/api/tournament', (req, res) => {
  res.status(200).json(tournaments);
});

app.get('/api/tournament/:id/schedule', (req, res) => {
  const tournamentId = parseInt(req.params.id, 10);
  const tournament = tournaments.find((t) => t.id === tournamentId);
  if (!tournament) {
    return res.status(404).send('Tournament not found');
  }
  res.send(tournament.matches);
});

app.listen(5001, () => {
  console.log('Backend running on port 5001');
});

