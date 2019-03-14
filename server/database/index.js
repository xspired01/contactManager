const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "contact_db"
  }
});

module.exports = knex;
