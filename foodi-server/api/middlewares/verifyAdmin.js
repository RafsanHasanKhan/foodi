const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const verifyAdmin = async (req, res, next) => {
  const email = req.decode.email;
  const query = {email: email};
  const user = await User.find(query);
  const isAdmin = user?.role === 'admin';

  if(!isAdmin) {
    return res.status(403).send({message: 'forbidden access'})
  }
  next()
}
module.exports = verifyAdmin;