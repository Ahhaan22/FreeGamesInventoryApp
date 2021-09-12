const product=require('./models/product');
const user=require('./models/developer');
module.exports.isLoggedIn=(req,res,next)=>{
	if(!req.isAuthenticated()){
		req.flash('error','you must be signed in');
		return res.redirect('/login');
	}
	console.log("req USER=",req.user);
	next();
}
module.exports.canUpdate_Delete=(req,res,next)=>{
	if(req.user===undefined){
		return res.redirect('/login');
	}
	else if(!req.isAuthenticated() || !authorized(req.user)){
		req.flash("error","You must be an admin");
		console.log('Not authorized');
		return res.redirect('/login');
	}
	console.log('Authorized');
	next();
}
module.exports.isAdmin=authorized;
function authorized(user){
	const {_id}=user;
	if(_id.equals("613a3a5049aa46436ca1dc8b")){
		return true;
	}
	else{
		return false;
	}
}