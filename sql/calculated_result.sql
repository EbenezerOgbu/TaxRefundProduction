

CREATE TABLE IF NOT EXISTS calculated_result (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
master_id INT NOT NULL,
date_added DATETIME,
calculated_paye  float NOT NULL,
calculated_usc float NOT NULL,
calculated_prsi  float NOT NULL,
calculated_tax_refund  float NOT NULL

);