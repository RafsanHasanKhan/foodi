// verify jwt token
// middleware
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).send({message: 'unauthorized access'})
  }
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if(err) {
      return res.status(401).send({message: 'token is invalid'})
    }
    req.decode = decode;
    next()
  })
}

module.exports = verifyToken;