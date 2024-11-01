// frontend/src/components/MatchResults.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/MatchResults.css'; // Corrected path

const MatchResults = ({ matches, onSaveResults }) => {
  const [updatedMatches, setUpdatedMatches] = useState([]);

  useEffect(() => {
    // Deep clone to prevent direct state mutation
    const clonedMatches = matches.map(match => ({ ...match }));
    setUpdatedMatches(clonedMatches);
  }, [matches]);

  /**
   * Handles the change of score inputs for a specific match.
   * @param {number} index - The index of the match in the matches array.
   * @param {string} field - The score field ('score1' or 'score2').
   * @param {string} value - The new value entered by the user.
   */
  const handleScoreChange = (index, field, value) => {
    const newMatches = [...updatedMatches];
    const scoreValue = value === '' ? null : parseInt(value, 10);

    // Validate that the score is a non-negative integer
    if (scoreValue === null || (Number.isInteger(scoreValue) && scoreValue >= 0)) {
      newMatches[index][field] = scoreValue;
      setUpdatedMatches(newMatches);
    }
  };

  /**
   * Handles the submission of updated match results.
   */
  const handleSubmit = () => {
    // Check if all matches have both scores entered
    const allScoresEntered = updatedMatches.every(match => match.score1 !== null && match.score2 !== null);

    if (!allScoresEntered) {
      alert('Please enter scores for all matches before saving.');
      return;
    }

    // Optional: Add confirmation before saving
    if (window.confirm('Are you sure you want to save the match results?')) {
      onSaveResults(updatedMatches);
      // The confirmation message is handled in App.js
    }
  };

  return (
    <div className="match-results-container">
      <h2>Enter Match Results</h2>
      <table className="match-results-table">
        <thead>
          <tr>
            <th>Poule</th>
            <th>Time</th>
            <th>Match</th>
            <th>Court</th>
            <th>Referee</th>
            <th>Score 1</th>
            <th>Score 2</th>
          </tr>
        </thead>
        <tbody>
          {updatedMatches.map((match, index) => (
            <tr key={`${match.poule}-${match.teams}-${index}`}>
              <td>{match.poule}</td>
              <td>{match.time}</td>
              <td>{match.teams}</td>
              <td>{match.court}</td>
              <td>{match.referee}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={match.score1 !== null ? match.score1 : ''}
                  onChange={(e) => handleScoreChange(index, 'score1', e.target.value)}
                  placeholder="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={match.score2 !== null ? match.score2 : ''}
                  onChange={(e) => handleScoreChange(index, 'score2', e.target.value)}
                  placeholder="0"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} className="save-results-button">
        Save Results
      </button>
    </div>
  );
};

// PropTypes for type checking
MatchResults.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSaveResults: PropTypes.func.isRequired,
};

export default MatchResults;

