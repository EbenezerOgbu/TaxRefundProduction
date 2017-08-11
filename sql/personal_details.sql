
CREATE TABLE IF NOT EXISTS personal_details (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
date_added DATETIME,
first_name VARCHAR (75),
last_name VARCHAR (75),
date_of_birth DATE,
nationality VARCHAR (30),
filing_status varchar(55) NOT NULL,
filing_year VARCHAR (25) NOT NULL
);

