require("dotenv").config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const session=require('express-session');
const ejsMate=require('ejs-mate');
const logger=require('morgan');
const path=require('path');
const axios=require('axios');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const flash=require('connect-flash');
//models
const product=require("./models/product");
const user=require("./models/developer");
//reuire Routes
const productRoutes=require("./routes/productRoutes");
const loginRoutes=require("./routes/loginRoutes");
const bookmarkRoutes=require("./routes/bookmarkRoutes");
//
const {isAdmin}=require('./loginMiddleware')
app.use(express.static(__dirname + '/public'));
app.set('view-engine','ejs');
app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'views')));
//session
app.use(express.static("public"));//to import javascript
app.use(session({secret:'This is secret',
	resave:false,
	secret: 'secrettexthere',
  	saveUninitialized:false,
  }
  )
);
app.use(flash());
//passport middleware
const localStrategy=require('passport-local');
const passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//mongoose connection
const db_url=process.env.DB_URL||"localhost:27017/gameApp";
mongoose.connect(db_url, { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connection');
});
app.use((req,res,next)=>{
	res.locals.success=req.flash("success");
	res.locals.error=req.flash("error");//makes the success message available on the template 
	res.locals.currentUser=req.user;
	next();
});
//routes
app.use("/products",productRoutes);
app.use("/",loginRoutes);
app.use("/bookmarks",bookmarkRoutes);
app.get('/landing',(req,res)=>{
	res.render("index.ejs");
});
app.all("*",(req,res,next)=>{
 	next(new Error("Page not available"));
})
app.use((err,req,res,next)=>{
	console.log(err.stack);
	const message=err.message;
	res.status(422).render("error.ejs",{message});
})
const port=process.env.PORT || 3000;
app.listen(port,()=>{
	console.log('listening on port 3000');
});