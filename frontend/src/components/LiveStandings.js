// frontend/src/components/LiveStandings.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/LiveStandings.css';

const LiveStandings = ({ standings }) => {
  useEffect(() => {
    console.log('Received standings in LiveStandings:', JSON.stringify(standings, null, 2)); // Log standings received
  }, [standings]);

  if (!standings || Object.keys(standings).length === 0) {
    return <div className="standings-container">No standings available.</div>;
  }

  return (
    <div className="standings-container">
      <h2>Live Tournament Standings</h2>
      {Object.entries(standings).map(([poule, teams]) => (
        <div key={poule} className="poule-standings">
          <h3>Poule {poule}</h3>
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
              {Object.values(teams)
                .sort((a, b) => b.points - a.points || b.difference - a.difference)
                .map((team) => (
                  <tr key={team.name}>
                    <td>{team.name}</td>
                    <td>{team.played}</td>
                    <td>{team.won}</td>
                    <td>{team.points}</td>
                    <td>{team.scored}</td>
                    <td>{team.against}</td>
                    <td>{team.difference}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

LiveStandings.propTypes = {
  standings: PropTypes.object.isRequired,
};

export default LiveStandings;

