import pool from './connection.js';

export const insertUser = async (first_name, last_name, username, hashedPassword,  membership_status = false, is_admin = false)=>{
    const user = await pool.query('INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin ) VALUES ($1, $2, $3, $4, $5, $6)', [first_name, last_name, username, hashedPassword, membership_status, is_admin]);
    return user;
}

export const updateMembershipUser = async (id, membership_status) => {
    await pool.query('UPDATE users SET membership_status = $2 WHERE id = $1', [id, membership_status]);
}

export const insertPost = async (user_id, title, content) => {
    const post = await pool.query('INSERT INTO post (user_id, title, content) VALUES ($1, $2, $3)', [user_id, title, content]);
    return post;
}

export const getAllsPosts = async () => {
    const posts = await pool.query('SELECT post.id, post.title, post.content, post.date, users.first_name, users.last_name, users.username, users.membership_status FROM post JOIN users On post.user_id = users.id ORDER BY post.date DESC');

    return posts.rows;
}

export const deletePost = async (id) => {
    await pool.query('DELETE FROM post where id = $1', [id]);
}