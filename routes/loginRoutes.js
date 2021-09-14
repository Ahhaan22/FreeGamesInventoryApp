const express=require('express');
const router=express.Router({mergeParams:true});
const passport=require('passport');
const user=require('../models/developer');
const userControllers=require('../controllers/login');
router.get('/',userControllers.getLogin);
router.route('/login')
	.get(userControllers.getLogin)
	.post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),userControllers.Login);
router.route('/signup')
	.get(userControllers.getSignup)
	.post(userControllers.SignUp);
router.get("/logout",userControllers.LogOut);
module.exports=router;