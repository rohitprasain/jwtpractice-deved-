const router = require('express').Router();

router.get('/register' , (req , res)=> {
    res.send("registeration");
})



module.exports = router;