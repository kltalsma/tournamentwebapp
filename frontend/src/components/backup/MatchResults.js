import React, { useState } from 'react';

function MatchResults({ matches, updateScore }) {
  const [scores, setScores] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (matchId, team, value) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) return;

    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [team]: numValue,
      },
    }));
  };

  const handleSubmit = (matchId) => {
    const scoresToSubmit = scores[matchId];
    if (!scoresToSubmit || !scoresToSubmit.teamA || !scoresToSubmit.teamB) {
      setError('Voer alstublieft beide scores in');
      return;
    }
    updateScore(matchId, scoresToSubmit);
  };

  return (
    <div>
      <h2>Wedstrijdresultaten</h2>
      {matches.map((match) => (
        <div key={match.id}>
          <div>{match.teamA} vs {match.teamB}</div>
          <input
            type="number"
            value={scores[match.id]?.teamA || ''}
            onChange={(e) => handleChange(match.id, 'teamA', e.target.value)}
          />
          <input
            type="number"
            value={scores[match.id]?.teamB || ''}
            onChange={(e) => handleChange(match.id, 'teamB', e.target.value)}
          />
          <button onClick={() => handleSubmit(match.id)}>Opslaan</button>
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  );
}

export default MatchResults;

