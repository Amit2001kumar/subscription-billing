import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "appuser",
  password: "app123",
  database: "subscription_system",
});
