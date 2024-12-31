const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@foodi-mongoose-client.mmcw5.mongodb.net/foodi-mongoose-client?retryWrites=true&w=majority&appName=foodi-mongoose-client`
  )
  .then(console.log('conected'))
  .catch(console.log(error => console.log(error)));


// jwt authentication
app.post('/jwt', async(req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.SECRET_TOKEN, {
    expiresIn: '1hr'
  })
  res.send({token})
})

// import routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
