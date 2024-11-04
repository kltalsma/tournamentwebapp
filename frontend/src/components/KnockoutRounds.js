// frontend/src/components/KnockoutRounds.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/KnockoutRounds.css'; // Ensure this path is correct based on your project structure

const KnockoutRounds = ({ teams }) => {
  const [knockoutMatches, setKnockoutMatches] = useState(generateInitialMatches(teams));

  /**
   * Generates the initial knockout matches based on the selected teams.
   * @param {Array} selectedTeams - Array of team objects selected for knockout.
   * @returns {Array} - Array of match objects for the first knockout round.
   */
  function generateInitialMatches(selectedTeams) {
    const shuffledTeams = [...selectedTeams].sort(() => 0.5 - Math.random());
    const matches = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (shuffledTeams[i + 1]) {
        matches.push({
          teamA: shuffledTeams[i].name,
          teamB: shuffledTeams[i + 1].name,
          scoreA: null,
          scoreB: null,
          winner: null,
        });
      } else {
        // Handle odd number of teams (e.g., bye)
        matches.push({
          teamA: shuffledTeams[i].name,
          teamB: 'BYE',
          scoreA: null,
          scoreB: null,
          winner: shuffledTeams[i].name,
        });
      }
    }

    return matches;
  }

  /**
   * Handles the score input for a knockout match.
   * @param {number} index - The index of the match in the knockoutMatches array.
   * @param {string} field - The score field ('scoreA' or 'scoreB').
   * @param {string} value - The new value entered by the user.
   */
  const handleScoreChange = (index, field, value) => {
    const newMatches = [...knockoutMatches];
    const scoreValue = value === '' ? null : parseInt(value, 10);

    // Validate that the score is a non-negative integer
    if (scoreValue === null || (Number.isInteger(scoreValue) && scoreValue >= 0)) {
      newMatches[index][field] = scoreValue;

      // Determine the winner if both scores are entered
      if (newMatches[index].scoreA !== null && newMatches[index].scoreB !== null) {
        if (newMatches[index].scoreA > newMatches[index].scoreB) {
          newMatches[index].winner = newMatches[index].teamA;
        } else if (newMatches[index].scoreB > newMatches[index].scoreA) {
          newMatches[index].winner = newMatches[index].teamB;
        } else {
          // Handle draws if necessary (e.g., overtime, penalty shootout)
          alert('Draws are not allowed in knockout stages. Please enter valid scores.');
          return;
        }
      }

      setKnockoutMatches(newMatches);
      console.log(`Knockout Match ${index} - ${field}: ${scoreValue}`); // Debugging Line
    }
  };

  /**
   * Proceeds to the next round of knockout matches based on current winners.
   */
  const proceedToNextRound = () => {
    const currentWinners = knockoutMatches
      .filter(match => match.winner !== null)
      .map(match => match.winner);

    if (currentWinners.length < 2) {
      alert('Not enough winners to proceed to the next round.');
      return;
    }

    const newMatches = generateInitialMatches(currentWinners);
    setKnockoutMatches(newMatches);
    console.log('Proceeding to the next knockout round:', newMatches); // Debugging Line
  };

  /**
   * Generates the final winner after all knockout rounds are completed.
   * @returns {string|null} - The name of the tournament winner or null if not yet determined.
   */
  const generateFinalWinner = () => {
    const finalMatch = knockoutMatches[0];
    if (finalMatch && finalMatch.winner) {
      return finalMatch.winner;
    }
    return null;
  };

  const finalWinner = generateFinalWinner();

  return (
    <div className="knockout-rounds-container">
      <h2>Knockout Rounds</h2>
      {knockoutMatches.length === 0 ? (
        <p>No knockout matches available.</p>
      ) : (
        <div>
          <table className="knockout-rounds-table">
            <thead>
              <tr>
                <th>Match</th>
                <th>Team A</th>
                <th>Score A</th>
                <th>Team B</th>
                <th>Score B</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {knockoutMatches.map((match, index) => (
                <tr key={`knockout-${index}`}>
                  <td>Match {index + 1}</td>
                  <td>{match.teamA}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={match.scoreA !== null ? match.scoreA : ''}
                      onChange={(e) => handleScoreChange(index, 'scoreA', e.target.value)}
                      placeholder="0"
                    />
                  </td>
                  <td>{match.teamB}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={match.scoreB !== null ? match.scoreB : ''}
                      onChange={(e) => handleScoreChange(index, 'scoreB', e.target.value)}
                      placeholder="0"
                    />
                  </td>
                  <td>{match.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Button to proceed to the next round */}
          <button onClick={proceedToNextRound} className="proceed-next-round-button">
            Proceed to Next Round
          </button>
          {/* Display final winner if determined */}
          {finalWinner && (
            <div className="final-winner">
              <h3>🏆 Tournament Winner: {finalWinner} 🏆</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// PropTypes for type checking
KnockoutRounds.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KnockoutRounds;

