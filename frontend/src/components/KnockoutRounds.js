// frontend/src/components/KnockoutRounds.js

import React from 'react';
import PropTypes from 'prop-types';
import "../styles/KnockoutRounds.css"; // Optional: Ensure correct path if needed

const KnockoutRounds = ({ teams }) => {
  if (!teams || teams.length === 0) {
    return <div className="knockout-container">No teams available for knockout rounds.</div>;
  }

  /**
   * Generates knockout matches based on the number of teams.
   * Currently supports Quarterfinals for up to 8 teams.
   * Can be extended for Semifinals and Finals.
   * @param {Array} teams - Array of team objects.
   * @returns {Array} - Array of knockout match objects.
   */
  const generateKnockoutMatches = (teams) => {
    const matches = [];
    const rounds = ['Quarterfinal', 'Semifinal', 'Final'];
    let currentRoundIndex = 0;

    // Determine the number of matches based on the number of teams
    for (let i = 0; i < teams.length; i += 2) {
      if (i + 1 < teams.length) {
        matches.push({
          round: rounds[currentRoundIndex],
          teams: `${teams[i].name} vs ${teams[i + 1].name}`,
          winner: null, // To be determined
        });
      }
    }

    return matches;
  };

  const knockoutMatches = generateKnockoutMatches(teams);

  return (
    <div className="knockout-container">
      <h2>Knockout Rounds</h2>
      {knockoutMatches.map((match, index) => (
        <div key={index} className="knockout-match">
          <h3>{match.round}</h3>
          <p>Match: {match.teams}</p>
          {/* Additional functionality can be added to determine winners */}
        </div>
      ))}
    </div>
  );
};

// PropTypes for type checking
KnockoutRounds.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default KnockoutRounds;

