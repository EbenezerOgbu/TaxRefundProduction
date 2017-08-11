


CREATE TABLE IF NOT EXISTS tax_input_details (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
master_id INT NOT NULL,
date_added DATETIME,
total_wages  float NOT NULL,
total_tax_allowance float NOT NULL,
tax_deduct_exp float NOT NULL,
number_of_employers  INT(10) NOT NULL,
second_earner_wages  float NOT NULL,
second_tax_allowance float NOT NULL,
second_tax_deduct_exp float NOT NULL,
second_number_of_employers  INT(10) NOT NULL,
total_tax_paid  float NOT NULL,
total_usc_paid  float NOT NULL,
total_prsi_paid  float NOT NULL

);