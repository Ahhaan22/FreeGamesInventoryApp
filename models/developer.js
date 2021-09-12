const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const devSchema=new Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	inventory:[{type:Schema.Types.ObjectId,ref:"product",required:false,sparse:true}]
});
//passport will add username and password fields to our mongoose schema
devSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("user",devSchema);