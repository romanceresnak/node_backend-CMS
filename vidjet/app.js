//create
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//inicialize
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Load Idea Model
require('./models/Idea');

const idea = mongoose.model('ideas');

//handlebars Middleware
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');

//Index Route
app.get('/', (req,res)=>{
    const title = 'Welcome';
    res.render('index',{
        title: title
    });
});

//About Route
app.get('/about',(req,res) =>{
    res.render("about");
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});