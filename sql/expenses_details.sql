


CREATE TABLE IF NOT EXISTS expenses_details (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
master_id INT NOT NULL,
date_added DATETIME,
medical_card VARCHAR (150),
medical_expenses float NOT NULL,
rent_paid                float NOT NULL,       
renting_before_2010   VARCHAR (150),
school_fees_paid    float NOT NULL

);
