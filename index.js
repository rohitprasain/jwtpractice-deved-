const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ejs = require('ejs');

app.set('view engine' , 'ejs');

// //import routes
const authRoute = require('./routes/auth');

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {
        console.log("connection successful");
    }
);

//middleware
app.use (express.json());

app.use(express.urlencoded({
    extended: true
  }))


app.get('/register' , (req, res)=> { 
    res.render('registrationForm');
})

app.get('/login' , (req, res)=> { 
    res.render('loginForm');
})


//routes middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => {
    console.log("listening to port 3000");
})