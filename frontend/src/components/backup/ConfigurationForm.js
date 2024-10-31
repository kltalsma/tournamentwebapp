import React, { useState } from 'react';
import Button from './ui/button';
import axios from 'axios';

const ConfigurationForm = ({ onSubmit }) => {
  const [numTeams, setNumTeams] = useState(6);
  const [numPoules, setNumPoules] = useState(2);
  const [numCourts, setNumCourts] = useState(2);
  const [matchTime, setMatchTime] = useState(40);
  const [startTime, setStartTime] = useState("09:00");
  const [tournamentDuration, setTournamentDuration] = useState(8);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      numTeams,
      numPoules,
      numCourts,
      matchTime,
      startTime,
      tournamentDuration,
    };
    onSubmit(config);
  };

  return (
    <div>
      <h2>Configuratie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Aantal Teams:</label>
          <input
            type="number"
            min="2"
            value={numTeams}
            onChange={(e) => setNumTeams(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Aantal Poules:</label>
          <input
            type="number"
            min="1"
            value={numPoules}
            onChange={(e) => setNumPoules(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Aantal Velden:</label>
          <input
            type="number"
            min="1"
            value={numCourts}
            onChange={(e) => setNumCourts(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Tijd per Wedstrijd (minuten):</label>
          <input
            type="number"
            min="1"
            value={matchTime}
            onChange={(e) => setMatchTime(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Start Tijd:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Toernooi Duur (uren):</label>
          <input
            type="number"
            min="1"
            value={tournamentDuration}
            onChange={(e) => setTournamentDuration(parseInt(e.target.value, 10))}
          />
        </div>
        <button type="submit">Maak Toernooi</button>
      </form>
      {message && (
        <p className={message.includes('succesvol') ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ConfigurationForm;

