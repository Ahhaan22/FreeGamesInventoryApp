const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:{type:String,required:true},
    thumbnail: {type:String,required:true},
    short_description: {type:String,required:true},
    game_url:{type:String,required:true},
    genre: {type:String,
    	enum:['Shooter','MMORPG','Fighting','Sports','Strategy','Card','Action RPG','MMO'],
    	required:true
    },
    platform: {type:String,
    	enum:['PC (Windows)','Web Browser'],
    	required:true},
    publisher: {type:String,required:true},
    developer: {type:String,required:true},
    release_date: {type:String,required:true},
    freetogame_profile_url: {type:String,required:true},
});

module.exports=mongoose.model('product',productSchema);