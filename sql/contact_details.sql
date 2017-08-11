


CREATE TABLE IF NOT EXISTS contact_details (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
master_id INT NOT NULL,
date_added DATETIME,
tel_number VARCHAR (25),
email_address VARCHAR (150)

);