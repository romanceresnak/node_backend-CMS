const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login',{user: req.user});
});

//auth logout
router.get('/logout',(req,res)=>{
    //handle with passport
    //res.send('logging out');
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google',passport.authenticate('google',{
    //what we want to retrieve
    scope:['profile']
}));

//callback route for google to redirect to
//after login passport grab the data and call calllback funtion in google strategy
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/');
    //res.send(req.user);
    // res.send('You reached the callback URL');
});

module.exports = router;