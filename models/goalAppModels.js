const { Pool } = require('pg');

// store in .env file later for security (?)
const PG_URI = 'postgresql://postgres.fjlwodtivsuankqmurkh:o1v3yLcMJiWHdbnM@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

// create pool w/ above connection string
const pool = new Pool({
    connectionString: PG_URI
});

// remember to require into controllers
module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};