// frontend/src/components/KnockoutRounds.js

import React from 'react';

const KnockoutRounds = ({ teams }) => {
  return (
    <div>
      <h2>Knockout Rounds</h2>
      {teams && teams.length > 0 ? (
        teams.map((team, index) => (
          <div key={index}>
            <p>{team.name}</p>
            <p>Points: {team.points}</p>
            <p>Scored: {team.scored}</p>
            {/* Render other team properties as needed */}
          </div>
        ))
      ) : (
        <p>No knockout teams available.</p>
      )}
    </div>
  );
};

export default KnockoutRounds;

