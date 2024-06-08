export const tableTypeVehicle = `
  CREATE TABLE IF NOT EXISTS Type_Vehicle (
    id_type VARCHAR PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  );
`;
