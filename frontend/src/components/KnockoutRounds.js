// frontend/src/components/KnockoutRounds.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/KnockoutRounds.css'; // Optional: Create a CSS file for styling

const KnockoutRounds = ({ teams }) => {
  if (!teams || teams.length === 0) {
    return <div className="knockout-container">No teams available for knockout rounds.</div>;
  }

  // Example structure for knockout rounds (e.g., Quarterfinals, Semifinals, Finals)
  // This can be expanded based on the number of teams
  const generateKnockoutMatches = (teams) => {
    const matches = [];
    for (let i = 0; i < teams.length; i += 2) {
      if (i + 1 < teams.length) {
        matches.push({
          round: 'Quarterfinal',
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

