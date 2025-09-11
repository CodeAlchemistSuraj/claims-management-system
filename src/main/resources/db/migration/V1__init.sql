-- Flyway baseline schema for claims management

CREATE TABLE IF NOT EXISTS "user" (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  date_of_birth DATE,
  date_of_joining DATE,
  spouse_name VARCHAR(255),
  spouse_dob DATE,
  pensioner BOOLEAN DEFAULT FALSE,
  pensioner_status VARCHAR(50),
  date_of_expiry DATE,
  role VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS claim (
  id BIGSERIAL PRIMARY KEY,
  sr_no INTEGER,
  claim_count INTEGER,
  year INTEGER,
  patient_name VARCHAR(255),
  hospital_name VARCHAR(255),
  covered_in VARCHAR(255),
  disease_name VARCHAR(255),
  date_of_admission DATE,
  date_of_discharge DATE,
  number_of_days_stay INTEGER,
  claim_amount DOUBLE PRECISION,
  room_rent_amount DOUBLE PRECISION,
  non_payable_amount DOUBLE PRECISION,
  payable_amount DOUBLE PRECISION,
  user_id BIGINT REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS bill_line_item (
  id BIGSERIAL PRIMARY KEY,
  bill_type VARCHAR(255),
  invoice_no VARCHAR(255),
  date DATE,
  amount DOUBLE PRECISION
);
