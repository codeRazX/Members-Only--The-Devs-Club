import {Pool} from 'pg';
// import 'dotenv/config';


export default new Pool({
    connectionString: (process.env.NODE_ENV === 'production')? process.env.DATABASE_URI_PROD : process.env.DATABASE_URI_DEV,
     ssl: {
        rejectUnauthorized: false,
    }
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Connection error:', err);
        return; 
    }
    console.log('Connected to database:', res.rows[0]);
});
