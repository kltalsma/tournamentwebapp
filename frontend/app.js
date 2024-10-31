import './styles/index.css';

// Define API URL from environment variable or use a default
const apiUrl = process.env.REACT_APP_API_URL || 'http://backend:5001';

// Function to fetch tournaments from the backend
const fetchTournaments = () => {
    fetch(`${apiUrl}/api/tournament`)
        .then(response => response.json())
        .then(data => {
            console.log('Tournaments:', data);
            renderTournaments(data);
        })
        .catch(error => {
            console.error('Error fetching tournaments:', error);
        });
};

// Function to create a new tournament by sending data to the backend
const createTournament = (tournamentData) => {
    fetch(`${apiUrl}/api/tournament`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Tournament created:', data);
            fetchTournaments(); // Fetch updated list after creating a tournament
        })
        .catch(error => {
            console.error('Error creating tournament:', error);
        });
};

// Function to render tournament data in the DOM
const renderTournaments = (tournaments) => {
    const tournamentsList = document.getElementById('tournaments-list');
    tournamentsList.innerHTML = ''; // Clear previous list

    tournaments.forEach((tournament) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Tournament ID: ${tournament.id}, Teams: ${tournament.num_teams}, Poules: ${tournament.num_poules}, Courts: ${tournament.num_courts}, Match Time: ${tournament.match_time} mins, Start Time: ${tournament.start_time}, Duration: ${tournament.tournament_duration} hrs`;
        tournamentsList.appendChild(listItem);
    });
};

// Event listener to handle tournament creation form submission
document.getElementById('tournament-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const numTeams = document.getElementById('num-teams').value;
    const numPoules = document.getElementById('num-poules').value;
    const numCourts = document.getElementById('num-courts').value;
    const matchTime = document.getElementById('match-time').value;
    const startTime = document.getElementById('start-time').value;
    const tournamentDuration = document.getElementById('tournament-duration').value;

    const tournamentData = {
        numTeams: parseInt(numTeams, 10),
        numPoules: parseInt(numPoules, 10),
        numCourts: parseInt(numCourts, 10),
        matchTime: parseInt(matchTime, 10),
        startTime,
        tournamentDuration: parseInt(tournamentDuration, 10),
    };

    createTournament(tournamentData);
});

// Initial fetch of tournaments when the page loads
fetchTournaments();

