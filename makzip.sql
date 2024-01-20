CREATE DATABASE makzip;

DROP DATABASE IF EXISTS `makzip`;

USE makzip;

CREATE TABLE Restaurant (
	id	int	PRIMARY KEY NOT NULL AUTO_INCREMENT,
	title	varchar(10)	NOT NULL,
	contents	varchar(100)	NOT NULL,
	created_at	DATETIME NOT NULL,
	updated_at	DATETIME NOT NULL,
	is_checked BOOLEAN DEFAULT FALSE NOT NULL
);

SELECT * FROM Restaurant;
SELECT * FROM Restaurant
            WHERE id = 1;
INSERT INTO Restaurant (created_at, updated_at,title,contents, is_checked)
VALUES
    (NOW(), NOW(),'히로스카츠' ,'맛도리', false);
