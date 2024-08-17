const sqlite3 = require("sqlite3").verbose();
let db = {};

const startDb = () => {
  db = new sqlite3.Database("mydatabase.db");
  return db;
};

const closeDb = (callback) => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Database closed.");
    }
    if (callback) callback(err);
  });
};

module.exports = { startDb, closeDb };
