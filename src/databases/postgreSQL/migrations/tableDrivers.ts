export const tableDrivers = `
  CREATE TABLE IF NOT EXISTS Driver (
    id_driver VARCHAR PRIMARY KEY NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  );
`;
