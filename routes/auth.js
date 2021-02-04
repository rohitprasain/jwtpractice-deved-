const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');


// dotenv.config();


router.get('/haha', (req, res, next) => {
    res.send("haha");
});


router.post('/register', async (req, res) => {

    //validate the form values (name , email , password) first using @hapi/joi
    //
    //
    //


    //checking if the user already exists in the database

    const emailExist = await User.findOne({
        email: req.body.email
    })

    if (emailExist) {
        return res.status(400).send('email aleaready exists in the database');
    }


    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
        //res.send( { user : user._id});

    } catch (err) {
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {

    //validate the form values (email , password) first using @hapi/joi
    //
    //
    //



    //checking if the email exists in the database
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return res.status(400).send('email or password is wrong');
    }


    //checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password , user.password);

    if(!validPass) {
        return res.status(400).send('email or password is wrong');
    }


    //create and assign a token
    const token  = jwt.sign({_id : user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token' , token).send(token);

    // res.send('logged In');



})

module.exports = router;