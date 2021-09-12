const express=require('express');
const router=express.Router();
const user=require('../models/developer');
const {isLoggedIn}=require('../loginMiddleware');
const bookmarkController=require("../controllers/bookmarks");

router.route('/')
	.get(isLoggedIn,bookmarkController.getBookmarks)
	.post(isLoggedIn,bookmarkController.createBookmarks);
router.delete('/:id',isLoggedIn,bookmarkController.deleteBookmarks)
module.exports=router;