const router = require('express').Router();

router.get('/good' , (req, res)=>{
    res.render('posts.js');
})

module.exports = router;