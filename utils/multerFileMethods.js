const multer=require('multer');
const path=require('path');
module.exports.fileStorageEngine=multer.diskStorage({
	destination:'./public/upload/',
	filename:(req,file,cb)=>{
		cb(null,Date.now()+'--'+file.fieldname+path.extname(file.originalname));
	},
});
module.exports.checkfiletype=(file,cb)=>{
	const filetype=/jpeg|jpg|png|gif/;
	const extname=filetype.test(path.extname(file.originalname).toLowerCase());
	const mimetype=filetype.test(file.mimetype);
	if(mimetype && extname){
		return cb(null,true)
	}
	else{
		new Error("Images only");
	}
};