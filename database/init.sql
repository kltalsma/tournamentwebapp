CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    num_teams INT NOT NULL,
    num_poules INT NOT NULL,
    num_courts INT NOT NULL,
    match_time INT NOT NULL,
    start_time TIME NOT NULL,
    tournament_duration INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    tournament_id INT REFERENCES tournaments(id) ON DELETE CASCADE,
    team_a INT,
    team_b INT,
    team_a_score INT,
    team_b_score INT,
    poule VARCHAR(50),
    court INT,
    refereeTeam VARCHAR(50),
    time TIME
);

