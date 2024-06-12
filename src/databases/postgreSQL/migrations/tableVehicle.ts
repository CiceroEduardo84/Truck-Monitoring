export const tableVehicles = `
CREATE TABLE IF NOT EXISTS Vehicle (
	id_vehicle VARCHAR PRIMARY KEY NOT NULL,
	plate VARCHAR NOT NULL,
	id_type VARCHAR NOT NULL,
	name_driver VARCHAR NOT NULL,
	status VARCHAR CHECK (status IN ('awaiting', 'enter', 'loading', 'finished')) DEFAULT 'awaiting',
	id_user VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_type) REFERENCES type_vehicle(id_type) ON DELETE CASCADE,
	FOREIGN KEY (id_user) REFERENCES Users(id_user)
);
`;
