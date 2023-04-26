BEGIN;

DROP TABLE IF EXISTS users, user_roles, subreddits, posts, comments, votes, friendship CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  question VARCHAR(255) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subreddits (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  creator INTEGER NOT NULL,

  FOREIGN KEY (creator) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE user_roles(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  subreddit_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subreddit_id) REFERENCES subreddits(id) ON DELETE CASCADE
);



CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  user_id INTEGER NOT NULL,
  subreddit_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subreddit_id) REFERENCES subreddits(id) ON DELETE CASCADE
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  body VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  vote BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE friendship (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(255) NOT NULL DEFAULT 'pending',

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
);

-- INSERT INTO users(username, email, password, photo, country) VALUES ('admin', 'abc@abc.com', '123123', 'https://i.imgur.com/3u3FIKo.jpg', 'Singapore');


COMMIT;