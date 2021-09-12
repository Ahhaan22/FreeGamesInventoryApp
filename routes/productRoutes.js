const express=require('express');
const router=express.Router({mergeParams:true});
const axios=require('axios');
const product=require("../models/product");
const user=require("../models/developer");
const productControllers=require("../controllers/products");
const multer=require('multer');
const path=require('path');
const {storage}=require("../cloudinary");
var GenreObj={};//key value pair of product_cat:product_cat.length;
var genres=['Shooter','Strategy','MMORPG','Fighting','Sports','Card'];//array of categories
const {isAdmin,isLoggedIn,canUpdate_Delete}=require("../loginMiddleware");
//mongodb+srv://first_user:<password>@cluster0.cxofk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//landing
//product render
const upload=multer({storage});
router.get('/',productControllers.getProducts);
//new product form
router.route('/new')
	.get(isLoggedIn,productControllers.getNew)
	.post(upload.single('thumbnail'),productControllers.addProducts);
//product category
router.route("/:id")
	.get(productControllers.viewCategory)
	.put(upload.single('thumbnail'),productControllers.editProducts)
	.delete(productControllers.deleteProduct);
//Edit Page
router.get('/:id/edit',canUpdate_Delete,productControllers.getEditPage);
//Edit Product
//Delete Product
//post req to products while adding a new product
module.exports=router;