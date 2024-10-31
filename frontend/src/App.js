// frontend/src/App.js

import React, { useState } from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import PouleSchedule from './components/PouleSchedule';
import MatchResults from './components/MatchResults';
import LiveStandings from './components/LiveStandings';
import KnockoutRounds from './components/KnockoutRounds';
import './styles/index.css';

const App = () => {
  const [config, setConfig] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [results, setResults] = useState({});
  const [standings, setStandings] = useState({});
  const [knockoutStage, setKnockoutStage] = useState(false);
  const [knockoutTeams, setKnockoutTeams] = useState([]);

  const handleConfigSubmit = (newConfig) => {
    setConfig(newConfig);
    setKnockoutStage(false);
    setSchedule([]);
    setResults({});
    setStandings({});
  };

  const generatePouleSchedule = () => {
    const { teamNames, numPoules, numCourts, matchTime, startTime } = config;
    const poules = Array.from({ length: numPoules }, () => []);

    teamNames.forEach((team, index) => {
      const pouleIndex = index % numPoules;
      poules[pouleIndex].push(team);
    });

    const addMinutes = (time, minutes) => {
      const [hour, min] = time.split(':').map(Number);
      const newMinutes = hour * 60 + min + minutes;
      const newHour = Math.floor(newMinutes / 60) % 24;
      const newMin = newMinutes % 60;
      return `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
    };

    let currentTime = startTime;
    const generatedSchedule = [];
    
    poules.forEach((poule, pouleIndex) => {
      for (let i = 0; i < poule.length - 1; i++) {
        for (let j = i + 1; j < poule.length; j++) {
          const nonPlayingTeams = teamNames.filter(
            (team) => team !== poule[i] && team !== poule[j]
          );
          const referee = nonPlayingTeams[generatedSchedule.length % nonPlayingTeams.length];

          generatedSchedule.push({
            time: currentTime,
            teams: `${poule[i]} vs ${poule[j]}`,
            poule: String(pouleIndex + 1), // Ensure poule is stored as string
            court: (generatedSchedule.length % numCourts) + 1,
            referee,
            score1: 0,
            score2: 0,
          });

          currentTime = addMinutes(currentTime, matchTime);
        }
      }
    });
    
    setSchedule(generatedSchedule);
  };

  const calculatePouleStandings = (pouleResults) => {
    console.log("Starting calculatePouleStandings with:", pouleResults);
    const pouleStandings = {};

    // Initialize teams in this poule
    pouleResults.forEach(match => {
      const [team1, team2] = match.teams.split(' vs ').map(t => t.trim());
      [team1, team2].forEach(team => {
        if (!pouleStandings[team]) {
          pouleStandings[team] = {
            name: team,
            played: 0,
            won: 0,
            points: 0,
            scored: 0,
            against: 0,
            difference: 0
          };
        }
      });
    });

    // Calculate statistics for each match
    pouleResults.forEach(match => {
      const [team1, team2] = match.teams.split(' vs ').map(t => t.trim());
      const score1 = parseInt(match.score1, 10) || 0;
      const score2 = parseInt(match.score2, 10) || 0;

      console.log(`Processing match ${team1} vs ${team2}: ${score1}-${score2}`);

      // Update match count
      pouleStandings[team1].played++;
      pouleStandings[team2].played++;

      // Update scores
      pouleStandings[team1].scored += score1;
      pouleStandings[team1].against += score2;
      pouleStandings[team2].scored += score2;
      pouleStandings[team2].against += score1;

      // Update wins and points
      if (score1 > score2) {
        pouleStandings[team1].won++;
        pouleStandings[team1].points += 3;
      } else if (score2 > score1) {
        pouleStandings[team2].won++;
        pouleStandings[team2].points += 3;
      } else {
        pouleStandings[team1].points += 1;
        pouleStandings[team2].points += 1;
      }
    });

    // Calculate differences
    Object.values(pouleStandings).forEach(team => {
      team.difference = team.scored - team.against;
    });

    console.log("Final poule standings:", pouleStandings);
    return pouleStandings;
  };

  const handleSaveResults = (newResults) => {
    console.log("Starting handleSaveResults with:", newResults);

    if (!Array.isArray(newResults)) {
      console.error("Expected newResults to be an array");
      return;
    }

    // Group results by poule, ensuring poule is treated as a string
    const resultsByPoule = newResults.reduce((acc, match) => {
      // Extract poule number and ensure it's a string
      const pouleNumber = String(match.poule);
      console.log(`Processing match for poule ${pouleNumber}:`, match);
      
      if (!acc[pouleNumber]) {
        acc[pouleNumber] = [];
      }
      // Only add matches with valid scores
      if (match.score1 !== undefined && match.score2 !== undefined) {
        acc[pouleNumber].push(match);
      }
      return acc;
    }, {});

    console.log("Results grouped by poule:", resultsByPoule);

    // Calculate standings for each poule separately
    const newStandings = {};
    Object.entries(resultsByPoule).forEach(([poule, pouleResults]) => {
      console.log(`Calculating standings for poule ${poule}`, pouleResults);
      newStandings[poule] = calculatePouleStandings(pouleResults);
    });

    console.log("Final new standings:", newStandings);
    setResults(newResults);
    setStandings(newStandings);
  };

  return (
    <div>
      <h1>Volleyball Tournament Configuration</h1>
      {!config ? (
        <ConfigurationForm onSubmit={handleConfigSubmit} />
      ) : (
        <>
          <button onClick={generatePouleSchedule}>Generate Schedule</button>
          <PouleSchedule schedule={schedule} />
          <MatchResults matches={schedule} onSaveResults={handleSaveResults} />
          <LiveStandings standings={standings} />
          <button onClick={() => setKnockoutStage(true)}>
            Save Results & Start Knockout Rounds
          </button>
          {knockoutStage && <KnockoutRounds teams={knockoutTeams} />}
        </>
      )}
    </div>
  );
};

export default App;
