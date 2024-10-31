// frontend/src/components/MatchResults.js
import React, { useState, useEffect } from 'react';
import '../styles/MatchResults.css';

const MatchResults = ({ matches, onSaveResults }) => {
  const [localResults, setLocalResults] = useState(
    matches.reduce((acc, match) => {
      acc[match.time] = { score1: match.score1 || 0, score2: match.score2 || 0 };
      return acc;
    }, {})
  );

  const handleScoreChange = (pouleIndex, matchIndex, scoreField, value) => {
    const updatedResults = { ...localResults };
    updatedResults[`${pouleIndex}-${matchIndex}`] = {
      ...updatedResults[`${pouleIndex}-${matchIndex}`],
      [scoreField]: parseInt(value) || 0,
    };
    setLocalResults(updatedResults);
  };

  const handleSave = () => {
    const formattedResults = matches.map((match, index) => {
      const pouleIndex = match.poule;
      return {
        ...match,
        score1: localResults[`${pouleIndex}-${index}`]?.score1 || 0,
        score2: localResults[`${pouleIndex}-${index}`]?.score2 || 0,
      };
    });
    onSaveResults(formattedResults);
  };

  return (
    <div>
      <h2>Enter Match Results</h2>
      {Object.entries(
        matches.reduce((acc, match) => {
          if (!acc[match.poule]) acc[match.poule] = [];
          acc[match.poule].push(match);
          return acc;
        }, {})
      ).map(([poule, pouleMatches]) => (
        <div key={poule}>
          <h3>Poule {poule}</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Match</th>
                <th>Court</th>
                <th>Referee</th>
                <th>Score 1</th>
                <th>Score 2</th>
              </tr>
            </thead>
            <tbody>
              {pouleMatches.map((match, matchIndex) => (
                <tr key={`${poule}-${matchIndex}`}>
                  <td>{match.time}</td>
                  <td>{match.teams}</td>
                  <td>{match.court}</td>
                  <td>{match.referee}</td>
                  <td>
                    <input
                      type="number"
                      value={localResults[`${poule}-${matchIndex}`]?.score1 || ''}
                      onChange={(e) =>
                        handleScoreChange(poule, matchIndex, 'score1', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={localResults[`${poule}-${matchIndex}`]?.score2 || ''}
                      onChange={(e) =>
                        handleScoreChange(poule, matchIndex, 'score2', e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button onClick={handleSave}>Save Results</button>
    </div>
  );
};

export default MatchResults;
