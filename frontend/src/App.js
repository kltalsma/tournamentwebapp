// frontend/src/App.js

import React, { useState } from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import PouleSchedule from './components/PouleSchedule';
import MatchResults from './components/MatchResults';
import LiveStandings from './components/LiveStandings';
import KnockoutRounds from './components/KnockoutRounds';
import './styles/index.css'; // Ensure this path is correct based on your project structure

const App = () => {
  const [config, setConfig] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [results, setResults] = useState([]);
  const [standings, setStandings] = useState({});
  const [knockoutStage, setKnockoutStage] = useState(false);
  const [knockoutTeams, setKnockoutTeams] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false); // New state for confirmation message

  const handleConfigSubmit = (newConfig) => {
    setConfig(newConfig);
    setKnockoutStage(false);
    setSchedule([]);
    setResults([]);
    setSaveSuccess(false); // Reset confirmation on new config

    const initialStandings = {};
    for (let i = 1; i <= newConfig.numPoules; i++) {
      initialStandings[String(i)] = {};
      const pouleTeams = newConfig.teamNames.filter(
        (team, index) => index % newConfig.numPoules === i - 1
      );
      pouleTeams.forEach((team) => {
        initialStandings[String(i)][team] = {
          name: team,
          played: 0,
          won: 0,
          points: 0,
          scored: 0,
          against: 0,
          difference: 0,
        };
      });
    }
    setStandings(initialStandings);
  };

  const addMinutes = (time, minutes) => {
    const [hour, min] = time.split(':').map(Number);
    const totalMinutes = hour * 60 + min + minutes;
    const newHour = Math.floor(totalMinutes / 60) % 24;
    const newMin = totalMinutes % 60;
    return `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
  };

  const generatePouleSchedule = () => {
    try {
      const { teamNames, numPoules, numCourts, matchTime, startTime } = config;
      const poules = Array.from({ length: numPoules }, () => []);

      teamNames.forEach((team, index) => {
        const pouleIndex = index % numPoules;
        poules[pouleIndex].push(team);
      });

      let currentTime = startTime;
      const generatedSchedule = [];

      poules.forEach((poule, pouleIndex) => {
        for (let i = 0; i < poule.length - 1; i++) {
          for (let j = i + 1; j < poule.length; j++) {
            const nonPlayingTeams = teamNames.filter(
              (team) => team !== poule[i] && team !== poule[j]
            );
            const referee =
              nonPlayingTeams[generatedSchedule.length % nonPlayingTeams.length] || 'Referee';

            generatedSchedule.push({
              time: currentTime,
              teams: `${poule[i]} vs ${poule[j]}`,
              poule: String(pouleIndex + 1),
              court: (generatedSchedule.length % numCourts) + 1,
              referee,
              score1: null,
              score2: null,
              completed: false,
            });

            currentTime = addMinutes(currentTime, matchTime);
          }
        }
      });

      setSchedule(generatedSchedule);
      console.log('Generated Schedule:', generatedSchedule); // Debugging Line
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Failed to generate schedule. Please check your configuration.');
    }
  };

  const calculatePouleStandings = (pouleResults) => {
     console.log('Calculating standings for poule results:', pouleResults); // Debugging Line
   
     const pouleStandings = {};
   
     pouleResults.forEach((match) => {
       const [team1, team2] = match.teams.split(' vs ').map((t) => t.trim());
   
       console.log(`Processing match: ${team1} vs ${team2} - Score: ${match.score1}-${match.score2}`); // Debugging Line
   
       [team1, team2].forEach((team) => {
         if (!pouleStandings[team]) {
           pouleStandings[team] = {
             name: team,
             played: 0,
             won: 0,
             points: 0,
             scored: 0,
             against: 0,
             difference: 0,
           };
         }
       });
   
       if (match.score1 !== null && match.score2 !== null) {
         const score1 = parseInt(match.score1, 10);
         const score2 = parseInt(match.score2, 10);
   
         pouleStandings[team1].played++;
         pouleStandings[team2].played++;
         pouleStandings[team1].scored += score1;
         pouleStandings[team2].scored += score2;
         pouleStandings[team1].against += score2;
         pouleStandings[team2].against += score1;
   
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
   
         pouleStandings[team1].difference = pouleStandings[team1].scored - pouleStandings[team1].against;
         pouleStandings[team2].difference = pouleStandings[team2].scored - pouleStandings[team2].against;
       }
     });
   
     console.log('Final poule standings:', pouleStandings); // Debugging Line
   
     return pouleStandings;
   };

   const handleSaveResults = (newResults) => {
     onsole.log('Initial newResults passed to handleSaveResults:', JSON.stringify(newResults, null, 2));
   
     const updatedMatches = newResults.map(match => {
       if (match.score1 !== null && match.score2 !== null) {
         return { ...match, completed: true };
       }
       return match;
     });
   
     const resultsByPoule = updatedMatches.reduce((acc, match) => {
       const pouleNumber = String(match.poule);
       if (!acc[pouleNumber]) {
         acc[pouleNumber] = [];
       }
       if (match.score1 !== null && match.score2 !== null) {
         acc[pouleNumber].push(match);
       }
       return acc;
     }, {});
   
     console.log('Results grouped by poule after Save:', JSON.stringify(resultsByPoule, null, 2)); // Debugging Line
   
     const newStandings = { ...standings };
   
     Object.entries(resultsByPoule).forEach(([poule, pouleResults]) => {
       console.log(`Calculating standings for poule ${poule}`, pouleResults); // Debugging Line
       newStandings[poule] = calculatePouleStandings(pouleResults);
     });
   
     setResults(updatedMatches);
     setStandings(newStandings);
     setSaveSuccess(true); // Set confirmation message
     setTimeout(() => setSaveSuccess(false), 5000);
   };


  const startKnockoutRounds = () => {
    try {
      const selectedTeams = [];
      Object.values(standings).forEach((poule) => {
        const sortedTeams = Object.values(poule).sort(
          (a, b) => b.points - a.points || b.difference - a.difference
        );
        selectedTeams.push(...sortedTeams.slice(0, 2));
      });

      if (selectedTeams.length === 0) {
        alert('No teams available to start knockout rounds.');
        return;
      }

      setKnockoutTeams(selectedTeams);
      setKnockoutStage(true);
      console.log('Selected Knockout Teams:', selectedTeams); // Debugging Line
    } catch (error) {
      console.error('Error starting knockout rounds:', error);
      alert('Failed to start knockout rounds. Please check standings.');
    }
  };

  return (
    <div className="app-container">
      <h1>Volleyball Tournament Configuration</h1>
      {!config ? (
        <ConfigurationForm onSubmit={handleConfigSubmit} />
      ) : (
        <div className="tournament-section">
          <button onClick={generatePouleSchedule} className="generate-schedule-button">
            Generate Schedule
          </button>

          {schedule.length > 0 && <PouleSchedule schedule={schedule} />}

          {schedule.length > 0 && (
            <MatchResults matches={schedule} onSaveResults={handleSaveResults} />
          )}

          <LiveStandings standings={standings} />

          <button onClick={startKnockoutRounds} className="start-knockout-button">
            Save Results & Start Knockout Rounds
          </button>

          {knockoutStage && <KnockoutRounds teams={knockoutTeams} />}

          {saveSuccess && <div className="confirmation-message">Match results saved successfully!</div>}
        </div>
      )}
    </div>
  );
};

export default App;

