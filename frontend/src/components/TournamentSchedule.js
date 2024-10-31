import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TournamentSchedule({ tournamentId }) {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tournament/${tournamentId}/schedule`);
            if (response.status === 200) {
                console.log('Fetched schedule:', response.data);
                setSchedule(response.data);
            } else {
                console.error('Error fetching schedule:', response.data);
                setError('Er is een fout opgetreden bij het ophalen van het schema.');
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setError('Er is een fout opgetreden bij het ophalen van het schema.');
        }
    };

    if (tournamentId) {
        fetchSchedule();
    }
  }, [tournamentId]);

  return (
    <div>
      <h2>Wedstrijdschema</h2>
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
      <ul>
        {schedule.map((match) => (
          <li key={match.id}>
            Team {match.team_a} vs Team {match.team_b} - Court {match.court} - Time: {match.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentSchedule;

