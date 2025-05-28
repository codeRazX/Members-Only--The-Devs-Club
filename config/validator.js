import pool from './connection.js';
import {body} from 'express-validator';
// import 'dotenv/config';

export const registerValidator = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ max: 50 }).withMessage('Username must be at most 50 characters')
    .custom(async (username) => {
      const user = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
      if (user.rows.length > 0) {
        throw new Error('Username already exists');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 8, max: 30 }).withMessage('Password must be between 8 and 30 characters'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm Password is required')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  body('first_name')
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 100 }).withMessage('First Name must be at most 100 characters'),

  body('last_name')
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 100 }).withMessage('Last Name must be at most 100 characters')
];

export const joinClubValidator = [
  body('key')
    .notEmpty().withMessage('Secret key is required')
    .custom((value, { req }) => {
      if (req.user && req.user.membership_status) {
        throw new Error('You are already a member of the club');
      }
      if (value !== process.env.SECRET_KEY) {
        throw new Error('Incorrect secret key');
      }
      return true;
    })
];

export const messageValidator = [
  body('title')
  .notEmpty().withMessage('Title is required')
  .isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),

  body('post')
  .notEmpty().withMessage('Message is required'),
];