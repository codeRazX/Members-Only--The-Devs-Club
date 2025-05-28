import { validationResult  } from 'express-validator';
import { insertUser, updateMembershipUser, insertPost, getAllsPosts, deletePost } from '../config/query.js';
import bcrypt from 'bcrypt';
// import 'dotenv/config';

export default class Controller{

    static getRootIndex = async (req, res ) => {
        const posts = await getAllsPosts();
        res.render('index', {posts});  
    };

    static getFormSignUp = (req, res) => res.render('sign-up-form', {errors: {}, formData: {}});

    static createUser = async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
           
            const errorObj = {};
            errors.array().forEach(err => {
            if (!errorObj[err.path]) {
                errorObj[err.path] = err.msg;
            }
            });
        
            return res.render('sign-up-form', {
                errors: errorObj,
                formData: req.body
            });
        }

        try{
          
             const { first_name, last_name, username, password, admin_code } = req.body;
             const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
             const  is_admin = admin_code === process.env.SECRET_ADMIN;
             const membership_status = is_admin ? true : false;

             await insertUser(first_name, last_name, username, hashedPassword, membership_status, is_admin);
             res.redirect('/success');

        }
        catch(err){
            console.error(err);
            return res.render('sign-up-form', {
                errors: { general: 'Something went wrong. Please try again later.' },
                formData: req.body
            });
        }
    }

    static getSuccess = (req, res) => res.render('success');

    static closeSession = (req, res, next) => {
        req.logout((err) => {
            if (err) {
            return next(err);
            }
            res.redirect("/");
        });
    }

    static getFormJoin = (req, res ) => res.render('join', {errors: {}, formData: {}});

    static validateJoinClub = async (req, res) =>{
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
           
            const errorObj = {};
            errors.array().forEach(err => {
            if (!errorObj[err.path]) {
                errorObj[err.path] = err.msg;
            }
            });
            
            return res.render('join', {
                errors: errorObj,
                formData: req.body
            });
        }

        try{
            await updateMembershipUser(req.user.id, true);
            res.redirect('/');
        }
        catch(err){
            console.error(err);
            return res.render('join', {
                errors: { general: 'Something went wrong. Please try again later.' },
                formData: req.body
            });
        }
    }

    static getFormMessage = (req, res) => res.render('message', {errors: {}, formData: {}});


    static createMessage = async (req, res) => {
         const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
           
            const errorObj = {};
            errors.array().forEach(err => {
            if (!errorObj[err.path]) {
                errorObj[err.path] = err.msg;
            }
            });
            
           
            return res.render('message', {
                errors: errorObj,
                formData: req.body
            });
        }

        try{
            const {title, post} = req.body;
            await insertPost(req.user.id, title, post);
            res.redirect('/');
        }
        catch(err){
            console.error(err);
            return res.render('message', {
                errors: { general: 'Something went wrong. Please try again later.' },
                formData: req.body
            });
        }
    }
    
    static deletePost = async (req, res) =>{
        
        try{
            const {id} = req.params;
            await deletePost(id);
            res.redirect('/');
        }
        catch(err){
            console.error(err);
        }
    }

}