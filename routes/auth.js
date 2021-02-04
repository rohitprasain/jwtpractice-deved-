const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

router.get('/haha' , (req, res , next) => {
    res.send("haha");
});




router.post('/register' , async (req , res)=> {

    //checking if the user already exists in the database

    const emailExist = await User.findOne({
        email : req.body.email
    })

    if(emailExist) { 
        return res.status(400).send('email aleaready exists in the database');
    }
  

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);


    //creating new user
    const user = new User ({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})



module.exports = router;