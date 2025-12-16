CREATE DATABASE subscription_system;
USE subscription_system;

CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'app123';

GRANT ALL PRIVILEGES ON subscription_system.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  monthlyQuota INT,
  extraChargePerUnit DECIMAL(10,2)
);

CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  planId INT,
  startDate DATE,
  isActive BOOLEAN,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (planId) REFERENCES plans(id)
);

CREATE TABLE usage_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  action VARCHAR(100),
  usedUnits INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);


INSERT INTO users (name) VALUES ('Amit');

INSERT INTO plans (name, monthlyQuota, extraChargePerUnit)
VALUES ('Basic', 100, 2.50);

INSERT INTO subscriptions (userId, planId, startDate, isActive)
VALUES (1, 1, CURDATE(), true);
