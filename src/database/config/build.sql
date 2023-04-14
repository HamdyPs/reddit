BEGIN;

DROP TABLE IF EXISTS users, posts, comments, votes, friends;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  date INTEGER NOT NULL,
  country VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  phone INTEGER NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  photo VARCHAR(255),
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  description TEXT,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO users(username, email, password, photo, date, country, role, phone, address) VALUES 
('admin','admin@gmail.com','$2a$10$hcarVj2MRTYH8uKUwavEouyMoozBb35piGNg.ssd3Uv5CNzVIR8xq',
'https://i.pinimg.com/564x/31/1b/2d/311b2def17cba6b7f05ac1d2ea976786.jpg', '1997', 'palestine', 
'admin', '0597883434', 'gaza-khanyounis');

INSERT INTO users(username, email, password, photo, date, country, role, phone, address) VALUES 
('user','user@gmail.com','$2a$09$ujnWLG2y.3eSQXJCBPHnb.i4eib0mfX4q6ws0ucphEuOEDIZzykMS',
'https://i.pinimg.com/564x/31/1b/2d/311b2def17cba6b7f05ac1d2ea976786.jpg', '1992', 'palestine', 
'user', '059135135', 'gaza-rafah');

COMMIT;
