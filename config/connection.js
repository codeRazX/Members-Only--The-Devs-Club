import {Pool} from 'pg';
// import 'dotenv/config';


export default new Pool({
    connectionString: (process.env.NODE_ENV === 'production')? process.env.DATABASE_URI_PROD : process.env.DATABASE_URI_DEV,
     ssl: {
        rejectUnauthorized: false,
    }
});
