export const tableEntryHistory = `
CREATE TABLE IF NOT EXISTS Entry_history (
	id_entry VARCHAR PRIMARY KEY NOT NULL,
	id_vehicle VARCHAR NOT NULL,
	id_user VARCHAR NOT NULL,
	status VARCHAR CHECK (status IN ('awaiting', 'enter', 'loading', 'finished')) DEFAULT 'awaiting',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_vehicle) REFERENCES Vehicle(id_vehicle) ON DELETE CASCADE,
	FOREIGN KEY (id_user) REFERENCES Users(id_user)
);
`;
