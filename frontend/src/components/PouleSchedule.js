// frontend/src/components/PouleSchedule.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PouleSchedule.css'; // Ensure this path is correct based on your project structure

const PouleSchedule = ({ schedule }) => {
  return (
    <div className="poule-schedule-container">
      <h2>Match Schedule</h2>
      {schedule.length === 0 ? (
        <p>No matches scheduled yet. Please generate the schedule.</p>
      ) : (
        <table className="poule-schedule-table">
          <thead>
            <tr>
              <th>Poule</th>
              <th>Time</th>
              <th>Match</th>
              <th>Court</th>
              <th>Referee</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((match, index) => (
              <tr key={`${match.poule}-${match.teams}-${index}`}>
                <td>{match.poule}</td>
                <td>{match.time}</td>
                <td>{match.teams}</td>
                <td>{match.court}</td>
                <td>{match.referee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// PropTypes for type checking
PouleSchedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PouleSchedule;

