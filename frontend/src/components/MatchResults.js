// frontend/src/components/MatchResults.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/MatchResults.css'; // Optional: Create a CSS file for styling

const MatchResults = ({ matches, onSaveResults }) => {
  const [updatedMatches, setUpdatedMatches] = useState([]);

  useEffect(() => {
    setUpdatedMatches(matches);
  }, [matches]);

  /**
   * Handles the change of score inputs for a specific match.
   * @param {number} index - The index of the match in the matches array.
   * @param {string} field - The score field ('score1' or 'score2').
   * @param {string} value - The new value entered by the user.
   */
  const handleScoreChange = (index, field, value) => {
    const newMatches = [...updatedMatches];
    newMatches[index][field] = value === '' ? null : parseInt(value, 10);
    setUpdatedMatches(newMatches);
  };

  /**
   * Handles the submission of updated match results.
   */
  const handleSubmit = () => {
    onSaveResults(updatedMatches);
    alert('Match results saved successfully.');
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

