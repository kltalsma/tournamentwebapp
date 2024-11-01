// frontend/src/components/ConfigurationForm.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../styles/ConfigurationForm.css"; // Optional: Ensure correct path if needed

const ConfigurationForm = ({ onSubmit }) => {
  const [teamNames, setTeamNames] = useState(['', '', '', '', '', '']);
  const [numPoules, setNumPoules] = useState(2);
  const [numCourts, setNumCourts] = useState(2);
  const [matchTime, setMatchTime] = useState(10); // in minutes
  const [startTime, setStartTime] = useState('09:00');

  /**
   * Handles changes to the team names input fields.
   * @param {number} index - The index of the team in the teamNames array.
   * @param {string} value - The new team name entered by the user.
   */
  const handleTeamNameChange = (index, value) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = value;
    setTeamNames(newTeamNames);
  };

  /**
   * Adds a new team input field.
   */
  const addTeam = () => {
    setTeamNames([...teamNames, '']);
  };

  /**
   * Removes a team input field.
   * @param {number} index - The index of the team to remove.
   */
  const removeTeam = (index) => {
    const newTeamNames = [...teamNames];
    newTeamNames.splice(index, 1);
    setTeamNames(newTeamNames);
  };

  /**
   * Handles the submission of the configuration form.
   * Validates the input data before submitting.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const trimmedTeamNames = teamNames.map((name) => name.trim()).filter((name) => name !== '');
    if (trimmedTeamNames.length < 2) {
      alert('Please enter at least two team names.');
      return;
    }

    if (numPoules < 1) {
      alert('Number of poules must be at least 1.');
      return;
    }

    if (numCourts < 1) {
      alert('Number of courts must be at least 1.');
      return;
    }

    // Ensure there are enough teams per poule
    if (trimmedTeamNames.length < numPoules) {
      alert('Number of poules cannot exceed the number of teams.');
      return;
    }

    // Submit the configuration
    onSubmit({
      teamNames: trimmedTeamNames,
      numPoules,
      numCourts,
      matchTime,
      startTime,
    });
  };

  return (
    <div className="configuration-form-container">
      <h2>Configure Tournament</h2>
      <form onSubmit={handleSubmit} className="configuration-form">
        <div className="form-group">
          <label>Team Names:</label>
          {teamNames.map((team, index) => (
            <div key={index} className="team-input-group">
              <input
                type="text"
                value={team}
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                placeholder={`Team ${index + 1}`}
                required
              />
              {teamNames.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeTeam(index)}
                  className="remove-team-button"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTeam} className="add-team-button">
            Add Team
          </button>
        </div>

        <div className="form-group">
          <label>Number of Poules:</label>
          <input
            type="number"
            min="1"
            value={numPoules}
            onChange={(e) => setNumPoules(parseInt(e.target.value, 10))}
            required
          />
        </div>

        <div className="form-group">
          <label>Number of Courts:</label>
          <input
            type="number"
            min="1"
            value={numCourts}
            onChange={(e) => setNumCourts(parseInt(e.target.value, 10))}
            required
          />
        </div>

        <div className="form-group">
          <label>Match Time (minutes):</label>
          <input
            type="number"
            min="1"
            value={matchTime}
            onChange={(e) => setMatchTime(parseInt(e.target.value, 10))}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

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

