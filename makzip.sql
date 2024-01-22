CREATE DATABASE makzip;

DROP DATABASE IF EXISTS makzip;



CREATE TABLE Restaurant (
	id serial PRIMARY KEY,
	title varchar(10) NOT NULL,
	contents varchar(100) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	is_checked BOOLEAN DEFAULT FALSE NOT NULL
);

SELECT * FROM Restaurant;
SELECT * FROM Restaurant
            WHERE id = 1;
INSERT INTO Restaurant (created_at, updated_at,title,contents, is_checked)
VALUES
    (NOW(), NOW(),'히로스카츠' ,'맛도리', false);
