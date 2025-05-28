import {Router} from 'express';
import Controller from '../controllers/Controller.js';
import {registerValidator, joinClubValidator, messageValidator} from '../config/validator.js';
import passport from 'passport';
const router = Router();


router.get('/', Controller.getRootIndex);
router.get('/sign-up', Controller.getFormSignUp);
router.get('/success', Controller.getSuccess);
router.get('/log-out', Controller.closeSession);
router.get('/join', Controller.getFormJoin);
router.get('/create/message', Controller.getFormMessage);
router.post('/sign-up', registerValidator, Controller.createUser);
router.post('/log-in', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
}));
router.post('/join', joinClubValidator, Controller.validateJoinClub);
router.post('/create/message', messageValidator, Controller.createMessage);
router.post('/delete/post/:id', Controller.deletePost);




export default router;
