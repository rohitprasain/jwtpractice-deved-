const jwt = require('jsonwebtoken');


const verifyAuth = (req, res , next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('access denied');

    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRENT);
        req.user = verified;
        next();
    }catch{
        res.status(400).send('Invalid Token');
    }
};

module.exports = verifyAuth;