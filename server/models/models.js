require('dotenv').config();

const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;
const PG_PASSWORD = process.env.PG_PASSWORD;
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  password: PG_PASSWORD
});


// export an obj that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};


