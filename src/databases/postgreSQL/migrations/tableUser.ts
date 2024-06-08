export const tableUser = `
  CREATE TABLE IF NOT EXISTS Users (
    id_user VARCHAR PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    type VARCHAR CHECK (type IN ('admin', 'porter', 'dispatcher')) DEFAULT 'porter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  );
`;
