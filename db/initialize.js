const pgp = require("pg-promise")();
//simpleton created to avoid each api route creating a new connection to the database server each tiem an api endpoint is called
//credit: https://www.codeoftheprogrammer.com/2020/01/16/postgresql-from-nextjs-api-route/

const user = process.env.user;
const password = process.env.password;
const host = process.env.host;
const port = process.env.port;
const database = process.env.database;
const cn = {
  host,
  port,
  database,
  user,
  password,
  max: 30,
};

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;
if (!hasDb) {
  global[DB_KEY] = pgp(cn);
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
  get: function () {
    return global[DB_KEY];
  },
});
Object.freeze(singleton);

module.exports = singleton;
