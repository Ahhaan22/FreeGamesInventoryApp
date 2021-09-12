const user=require('../models/developer');
const {isLoggedIn}=require('../loginMiddleware');

module.exports.getBookmarks=async(req,res)=>{
	const reqUser=await user.findById(req.user).populate("inventory");
	const data=reqUser.inventory;
	res.render("bookmarks.ejs",{data});
}

module.exports.createBookmarks=async (req,res,next)=>{
	try{
		console.log(req.body);
		const {_id}=req.body;
		console.log(_id);
		const reqUser=await user.findById(req.user);
		const items=reqUser.inventory;
		if(items===[]){
			const reqUserUp=await user.findByIdAndUpdate(req.user,{inventory:[_id]});
		}
		else if(!items.includes(_id)){
			const reqUserUp=await user.findByIdAndUpdate(req.user,{inventory:[...items,_id]});
		}
		res.redirect("/products");
	}catch(e){
		e.message="Request could not be processed";
		next(e);
	}
}
module.exports.deleteBookmarks=async(req,res,next)=>{
	try{
		const {id}=req.params;
		await user.updateOne({_id:req.user},{$pullAll:{inventory:[id]}});
		res.redirect("/products");
	}catch(e){
		e.message+"Request could not be processed";
		next(e);
	}
};