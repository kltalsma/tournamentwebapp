// frontend/src/components/PouleSchedule.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PouleSchedule.css'; // Optional: Create a CSS file for styling

const PouleSchedule = ({ schedule }) => {
  if (!schedule || schedule.length === 0) {
    return <div className="schedule-container">No schedule available.</div>;
  }

  // Group matches by poule
  const scheduleByPoule = schedule.reduce((acc, match) => {
    const poule = match.poule;
    if (!acc[poule]) {
      acc[poule] = [];
    }
    acc[poule].push(match);
    return acc;
  }, {});

  return (
    <div className="schedule-container">
      <h2>Match Schedule</h2>
      {Object.entries(scheduleByPoule).map(([poule, matches]) => (
        <div key={poule} className="poule-schedule">
          <h3>Poule {poule}</h3>
          <table className="schedule-table">
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
                <tr key={`${poule}-${index}`}>
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
};

// PropTypes for type checking
PouleSchedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PouleSchedule;

