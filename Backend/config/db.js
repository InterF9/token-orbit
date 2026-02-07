import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set (hidden for security)" : "NOT SET");

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : {
    rejectUnauthorized: false
  }
});
