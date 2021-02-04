const express  = require('express');

const app = express();


// //import routes
const authRoute = require('./routes/auth');

// app.get('/register' , (req, res)=> { 
//     res.send("register");
// })
//routes middlewares
app.use('/api/user' , authRoute);


app.listen(3000 , ()=> {
    console.log("listening to port 3000");
})