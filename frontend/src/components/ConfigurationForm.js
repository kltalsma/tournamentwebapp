// frontend/src/components/ConfigurationForm.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ConfigurationForm.css'; // Ensure this path is correct based on your project structure

const ConfigurationForm = ({ onSubmit }) => {
  const [numPoules, setNumPoules] = useState(2);
  const [numCourts, setNumCourts] = useState(2);
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6']);
  const [matchTime, setMatchTime] = useState(10); // in minutes
  const [startTime, setStartTime] = useState('09:00');

  /**
   * Handles the submission of the configuration form.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure at least two teams per poule
    if (teamNames.length < numPoules * 2) {
      alert(`Please enter at least ${numPoules * 2} teams to have at least two teams per poule.`);
      return;
    }

    // Prepare configuration object
    const newConfig = {
      numPoules,
      numCourts,
      teamNames,
      matchTime,
      startTime,
    };

    onSubmit(newConfig);
  };

  /**
   * Handles changes in the team names input.
   * @param {Object} e - The event object.
   */
  const handleTeamNamesChange = (e) => {
    const input = e.target.value;
    const teams = input.split(',').map((team) => team.trim()).filter(team => team !== '');
    setTeamNames(teams);
  };

  return (
    <div className="configuration-form-container">
      <h2>Configure Tournament</h2>
      <form onSubmit={handleSubmit} className="configuration-form">
        <label>
          Number of Poules:
          <input
            type="number"
            min="1"
            value={numPoules}
            onChange={(e) => setNumPoules(parseInt(e.target.value, 10))}
            required
          />
        </label>
        <label>
          Number of Courts:
          <input
            type="number"
            min="1"
            value={numCourts}
            onChange={(e) => setNumCourts(parseInt(e.target.value, 10))}
            required
          />
        </label>
        <label>
          Team Names (comma-separated):
          <input
            type="text"
            value={teamNames.join(', ')}
            onChange={handleTeamNamesChange}
            placeholder="e.g., Team 1, Team 2, Team 3, ..."
            required
          />
        </label>
        <label>
          Match Duration (minutes):
          <input
            type="number"
            min="1"
            value={matchTime}
            onChange={(e) => setMatchTime(parseInt(e.target.value, 10))}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit-configuration-button">
          Submit Configuration
        </button>
      </form>
    </div>
  );
};

// PropTypes for type checking
ConfigurationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ConfigurationForm;

