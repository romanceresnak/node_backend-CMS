const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongooose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
let ejs = require('ejs-html')

const app = express();

//set view engine
app.set('view engine','ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,//day in milisecond
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongooose.connect(keys.mongodb.dbURI, ()=>{
    console.log('connected to mongo db');
});

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route
app.get('/', (req,res)=>{
    res.render('home',{user: req.user});
});

app.listen(3000,()=>{
    console.log('app now listening on the port 3000');
});