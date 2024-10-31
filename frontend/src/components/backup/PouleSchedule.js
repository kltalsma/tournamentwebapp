import React from 'react';

function PouleSchedule({ poule }) {
  if (!poule || !Array.isArray(poule.matches)) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Wedstrijdschema per Poule</h2>
        <p className="text-gray-500">Geen wedstrijdschema beschikbaar.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wedstrijdschema per Poule {poule.pouleNumber}</h2>
      <ul>
        {poule.matches.map((match, index) => (
          <li key={index}>
            {match.teamA} vs {match.teamB} - Court {match.court} - Time: {match.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PouleSchedule;

