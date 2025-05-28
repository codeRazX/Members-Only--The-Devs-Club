import pool from './connection.js';


(async () => {

    
    const queryTables = 
    `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL, 
            membership_status BOOLEAN DEFAULT FALSE,
            is_admin BOOLEAN DEFAULT FALSE
        );

        CREATE TABLE IF NOT EXISTS post (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        );

    `;

    try{
        await pool.query(queryTables);
    }
    catch(err){
        console.error('Failed to create tables');
    }


})();
