export const tableVehicles = `
  CREATE TABLE IF NOT EXISTS Vehicle (
    id_vehicle VARCHAR PRIMARY KEY NOT NULL,
    plate VARCHAR NOT NULL UNIQUE,
    id_type VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_type) REFERENCES type_vehicle(id_type)
  );
`;
