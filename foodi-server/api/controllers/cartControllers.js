const Carts = require('../models/Carts');

// post a cart when add to btn clicked

const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, category, price, quantity, email } =
    req.body;
  try {
    // exiting menu
    const existingCart = await Carts.findOne({ menuItemId });
    if (existingCart) {
      return res.status(400).json({ message: 'product already existed' });
    }
    const cartItem = await Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      category,
      price,
      quantity,
      email,
    });
    res.status(200).json(cartItem);
  } catch (error) {}
};

// get cart using by email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a cart item
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      res.status(404).json({ message: 'cart items not found' });
    }
    res.status(200).json({ message: 'cart item deleted successfully' });
  } catch (error) {}
};

// update a cart item
const updateCart = async(req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, category, price, quantity, email } =
    req.body;
  try {
    const updateCart = await Carts.findByIdAndUpdate(cartId,{ menuItemId, name, recipe, image, category, price, quantity, email }, {new:true, runValidators:true} )
    if(!updateCart) {
      return res.status(404).json({message: 'Cart is not found'})
    }
    res.status(200).json(updateCart)
  } catch (error) {
    
  }
}

// get single cart recipe 
const getSingleCart =  async(req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId)
    res.status(200).json(cartItem)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart
};
