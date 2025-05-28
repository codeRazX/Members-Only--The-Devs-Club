import express from 'express';
import './config/populateDB.js';
import router from './routes/router.js';
import { initialize } from './config/passport-config.js';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
// import 'dotenv/config';

const app = express();
app.use(express.static(process.cwd() + '/public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
initialize();
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});
app.use(router);



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('Server running on PORT: ', PORT));