const path=require('path');
require('dotenv').config({path:"../.env"});
const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const product=require("../models/product");
const items=require("./items");
const axios=require('axios');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connection');
});
const seedProduct2=async()=>{
	product.deleteMany({});
	for(let i=0;i<items.length;i++){
		console.log(items[i]);
		const Product=new product(items[i]);
		await Product.save();
	}
}
const displayProduct=async()=>{
	product.find({}).then((data)=>{
		console.log(data);
	})
}
seedProduct2();