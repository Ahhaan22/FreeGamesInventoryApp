const passport=require('passport');
const user=require('../models/developer');
module.exports.getLogin=(req,res)=>{
	res.render("login.ejs");
}
module.exports.Login=async(req,res)=>{
	//req.flash('success','welcome back');
	try{
		console.log(req.isAuthenticated());
		res.redirect('/products');
	}
	catch(e){
		req.flash("error",e.message);
	}
};
module.exports.getSignup=async(req,res)=>{
	const test=await user.find({});
	console.log(test);
	res.render("signup.ejs");
};
module.exports.SignUp=async (req,res)=>{
	try{
		console.log(req.body);
		const {username,password,email}=req.body;
		const User=new user({email,username});
		const registeredUser=await user.register(User,password);
		console.log(registeredUser);
		console.log(User);
		req.login(registeredUser,err=>{
			if(err){
				res.redirect("/signup");
				return req.flash("error",err.message);
			}
		});
		res.redirect("landing");
	}catch(e){
		req.flash("error",e.message);
		res.redirect("/signup");
	}
};
module.exports.LogOut=(req,res)=>{
	req.logout();
	res.redirect("/landing");
}