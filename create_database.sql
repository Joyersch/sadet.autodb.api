DROP DATABASE IF EXISTS Sadet;
CREATE DATABASE sadet;
\c sadet;

CREATE TABLE Games (
	AppId	int  PRIMARY KEY,
	Name	varchar(1000)
);

CREATE  TABLE Data (
	Index	SERIAL PRIMARY KEY,
	CreatedAt	TimeStamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	AppId	int,
	Completion float,
	IsAvarage boolean
);

