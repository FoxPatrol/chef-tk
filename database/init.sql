/*

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(24) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT '1970-01-01' NOT NULL,
    online BOOLEAN DEFAULT FALSE NOT NULL
);

-- Create the hive table
CREATE TABLE IF NOT EXISTS hive (
    id UUID PRIMARY KEY,
    honey_qty INTEGER DEFAULT 0,
    bee_qty INTEGER DEFAULT 0,
    queen_qty INTEGER DEFAULT 0,
    swarm_qty INTEGER DEFAULT 0,
    colony_qty INTEGER DEFAULT 0,
    FOREIGN KEY (id) REFERENCES users (id)
);

-- Create the achievement_list table
CREATE TABLE IF NOT EXISTS achievement_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    description VARCHAR,
    category VARCHAR,
    icon_name VARCHAR,
    rank VARCHAR,
    score INTEGER DEFAULT 0 NOT NULL
);

-- Create the user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    achievement_id UUID REFERENCES achievement_list(id),
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Prefill tables with admin user
WITH rows AS (
  INSERT INTO users (username, password)
  VALUES ('admin', 'beedmin')
  RETURNING id
)
INSERT INTO hive (id)
SELECT id
FROM rows
RETURNING id;

*/