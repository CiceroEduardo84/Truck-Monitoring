export const tableHistoricDriver = `
  CREATE TABLE IF NOT EXISTS Historic_driver (
    id VARCHAR PRIMARY KEY NOT NULL,
    id_vehicle VARCHAR NOT NULL,
    id_driver VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_vehicle) REFERENCES Vehicle(id_vehicle) ON DELETE CASCADE,
    FOREIGN KEY (id_driver) REFERENCES Driver(id_driver) ON DELETE CASCADE
  );
`;
