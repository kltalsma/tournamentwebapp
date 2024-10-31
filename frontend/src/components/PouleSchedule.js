// frontend/src/components/PouleSchedule.js
import React from 'react';
import '../styles/PouleSchedule.css';  // Import the CSS file

function PouleSchedule({ schedule }) {
  const groupedByPoule = schedule.reduce((acc, match) => {
    if (!acc[match.poule]) acc[match.poule] = [];
    acc[match.poule].push(match);
    return acc;
  }, {});

  return (
    <div>
      <h2>Poule Schedule</h2>
      {Object.entries(groupedByPoule).map(([poule, matches]) => (
        <div key={poule}>
          <h3>Poule {poule}</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Match</th>
                <th>Court</th>
                <th>Referee</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index}>
                  <td>{match.time}</td>
                  <td>{match.teams}</td>
                  <td>{match.court}</td>
                  <td>{match.referee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default PouleSchedule;
