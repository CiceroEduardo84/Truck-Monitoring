--Create Table User
CREATE TABLE IF NOT EXISTS Users (
	id_user VARCHAR PRIMARY KEY NOT NULL,
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	type VARCHAR CHECK (type IN ('admin', 'porter', 'dispatcher')) DEFAULT 'porter',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

--Create Table Type_Vehicle
CREATE TABLE IF NOT EXISTS Type_Vehicle (
	id_type VARCHAR PRIMARY KEY NOT NULL,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Create table Vahicle
CREATE TABLE IF NOT EXISTS Vehicle (
	id_vehicle VARCHAR PRIMARY KEY NOT NULL,
	plate VARCHAR NOT NULL,
	id_type VARCHAR NOT NULL,
	name_driver VARCHAR NOT NULL,
	status VARCHAR CHECK (status IN ('awaiting', 'enter', 'loading', 'finished')) DEFAULT 'awaiting',
	id_user VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_type) REFERENCES type_vehicle(id_type) ON DELETE CASCADE
	FOREIGN KEY (id_user) REFERENCES Users(id_user)
	);