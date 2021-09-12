var GenreObj={};//key value pair of product_cat:product_cat.length;
var genres=['Shooter','Strategy','MMORPG','Fighting','Sports','Card'];//array of categories
const product=require("../models/product");
const user=require("../models/developer");
const {isAdmin}=require("../loginMiddleware");
module.exports.getProducts=async (req,res,next)=>{
	try{
		const data=await product.find({});
	//console.log(data);
		res.cookie("data",data.length,{httpOnly: false});
		//below is the code to update the length of every category
		for(let i=0;i<genres.length;i++){
			const genre=data.filter(function (currentValue) {
				return currentValue.genre===genres[i];
			});
			GenreObj[genres[i]]=genre.length;//the category and the length are stored as key value pairs
		}
		//genre obj is further converted to a JSON string and send as a cookie
		res.cookie("genres",JSON.stringify(GenreObj),{httpOnly: false});
		const pc=await product.find({platform:"PC (Windows)"});
		const browser=await product.find({platform:"Web Browser"});
		res.cookie("PC",pc.length,{httpOnly: false});
		res.cookie("Browser",browser.length,{httpOnly: false});
		if(req.user){
			const User=await user.findById(req.user);
			const {inventory}=User;
			console.log(inventory);
			return res.render("product.ejs",{data,inventory,isAdmin});
		}
		res.render("product.ejs",{data});
	}catch(e){
		e.message="Request could not be processed";
		next(e);
	}
};
module.exports.getNew=(req,res,next)=>{
	res.render("new.ejs");
}

module.exports.addProducts=async (req,res,next)=>{
	try{
		const {title,short_description,game_url,genre,platform,publisher,developer,release_date,freetogame_profile_url}=req.body;
		console.log(req.file);
		const thumbnail=req.file.path;
		const newProduct=new product({title,thumbnail,short_description,game_url,genre,platform,publisher,developer,release_date,freetogame_profile_url});
		await newProduct.save();
		req.flash("success","Game added successfully");
		res.redirect("/products/new");
	}catch(e){
		next(e);
	}
}
module.exports.viewCategory=async(req,res,next)=>{
	try{
		const {id}=req.params;
		console.log(id);
		const data=await product.find({'genre':id});
		if(genres.includes(id)){
			if(req.user){
				const User=await user.findById(req.user);
				const {inventory}=User;
				console.log(inventory);
				return res.render("productCategory.ejs",{data,id,inventory});
			}
		res.render("productCategory.ejs",{data,id}); 
		}
		else{
			throw new Error("Page not available");
		}
	}catch(e){
		next(e);
	}
}
module.exports.getEditPage=async(req,res,next)=>{
	try{
		const {id}=req.params;
		const data=await product.findById(id);
		res.render("edit.ejs",{data});
	}catch(e){
		e.message="Product not found";
		next(e);
	}
};
module.exports.editProducts=async(req,res,next)=>{
	try{
		const {id}=req.params;
		const {title,short_description,publisher,platform,game_url,freetogame_profile_url,release_date,genre}=req.body;
		const data=await product.findByIdAndUpdate(id,{title,short_description,publisher,platform,game_url,freetogame_profile_url,release_date,genre});
		res.redirect("/products");
	}catch(e){
		e.message="Could not edit";
		next(e);
	}
}
module.exports.deleteProduct=async (req,res,next)=>{
	try{
		const {id}=req.params;
		const deleted=await product.findByIdAndDelete(id);
		req.flash("success","Game deleted");
		res.redirect("/products");
	}catch(e){
		e.message="Request could not be processed";
		next(e);
	}
}