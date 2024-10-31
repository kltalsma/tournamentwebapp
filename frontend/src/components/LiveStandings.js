// frontend/src/components/LiveStandings.js

import React from 'react';

const LiveStandings = ({ standings }) => {
  // Helper function to calculate difference
  const calculateDifference = (scored, against) => scored - against;

  // Ensure standings is a valid object before using Object.keys
  if (!standings || typeof standings !== 'object') {
    return <p>No standings available. Please save results to update standings.</p>;
  }

  return (
    <div>
      <h2>Live Tournament Standings</h2>
      {Object.keys(standings).map((pouleNumber) => (
        <div key={pouleNumber}>
          <h3>Poule {pouleNumber}</h3>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Points</th>
                <th>Scored</th>
                <th>Against</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(standings[pouleNumber])
                .sort((a, b) => {
                  // First by points
                  if (b.points !== a.points) return b.points - a.points;
                  // Then by goal difference
                  const diffA = calculateDifference(a.scored, a.against);
                  const diffB = calculateDifference(b.scored, b.against);
                  if (diffB !== diffA) return diffB - diffA;
                  // Finally by goals scored
                  return b.scored - a.scored;
                })
                .map((team) => (
                  <tr key={team.name}>
                    <td>{team.name}</td>
                    <td>{team.played}</td>
                    <td>{team.won}</td>
                    <td>{team.points}</td>
                    <td>{team.scored}</td>
                    <td>{team.against}</td>
                    <td
                      className={
                        calculateDifference(team.scored, team.against) > 0
                          ? 'positive'
                          : calculateDifference(team.scored, team.against) < 0
                          ? 'negative'
                          : ''
                      }
                    >
                      {calculateDifference(team.scored, team.against)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default LiveStandings;

