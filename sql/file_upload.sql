

CREATE TABLE IF NOT EXISTS file_upload (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
master_id INT NOT NULL,
date_added DATETIME,
p60_p45 VARCHAR (150),
employers_id   VARCHAR (150),
employers_p60_p45  VARCHAR (150),
found_us_through VARCHAR (150)

);