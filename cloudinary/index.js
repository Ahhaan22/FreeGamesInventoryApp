const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
 
const app = express();
cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_KEY,
	api_secret:process.env.CLOUDINAY_SECRET
 });
const storage = new CloudinaryStorage({
	cloudinary,
	params:{
		folder:"Inventory Management",
		allowedFormats:["jpeg","png","jpg"]
	}
});
 module.exports={
 	cloudinary,
 	storage
 }