// frontend/src/components/ConfigurationForm.js
import React, { useState, useEffect } from 'react';
import Button from './ui/button';
import Input from './ui/input';
import '../styles/ConfigurationForm.css';

function ConfigurationForm({ onSubmit }) {
  const [numTeams, setNumTeams] = useState(6);
  const [numPoules, setNumPoules] = useState(2);
  const [numCourts, setNumCourts] = useState(2);
  const [matchTime, setMatchTime] = useState(10);
  const [startTime, setStartTime] = useState('09:00');
  const [tournamentDuration, setTournamentDuration] = useState(90);
  const [teamNames, setTeamNames] = useState(
    Array.from({ length: numTeams }, (_, i) => `Team ${i + 1}`)
  );

  const handleNumTeamsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumTeams(value);
    setTeamNames(Array.from({ length: value }, (_, i) => teamNames[i] || `Team ${i + 1}`));
  };

  const handleTeamNameChange = (index, name) => {
    const updatedNames = [...teamNames];
    updatedNames[index] = name;
    setTeamNames(updatedNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      numTeams,
      numPoules,
      numCourts,
      matchTime,
      startTime,
      tournamentDuration,
      teamNames,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        Number of Teams:
        <input type="number" value={numTeams} onChange={handleNumTeamsChange} />
      </label>
      <label>
        Number of Poules:
        <input type="number" value={numPoules} onChange={(e) => setNumPoules(parseInt(e.target.value, 10))} />
      </label>
      <label>
        Number of Courts:
        <input type="number" value={numCourts} onChange={(e) => setNumCourts(parseInt(e.target.value, 10))} />
      </label>
      <label>
        Match Time (mins):
        <input type="number" value={matchTime} onChange={(e) => setMatchTime(parseInt(e.target.value, 10))} />
      </label>
      <label>
        Start Time:
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <label>
        Tournament Duration (mins):
        <input type="number" value={tournamentDuration} onChange={(e) => setTournamentDuration(parseInt(e.target.value, 10))} />
      </label>
      <h3>Team Names</h3>
      {teamNames.map((name, index) => (
        <label key={index}>
          Team {index + 1}:
          <input
            type="text"
            value={name}
            onChange={(e) => handleTeamNameChange(index, e.target.value)}
          />
        </label>
      ))}
      <button type="submit">Create Tournament</button>
    </form>
  );
}

export default ConfigurationForm;

