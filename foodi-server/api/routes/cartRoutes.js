const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers.js');
const verifyToken = require('../middlewares/verifyToken.js');

// Middleware to validate and authenticate user
// Apply `verifyToken` to all routes if necessary
router.use(verifyToken);

// Route: Get all cart items by email
router.get('/', cartController.getCartByEmail);

// Route: Add a new item to the cart
router.post('/', cartController.addToCart);

// Route: Delete a specific cart item by ID
router.delete('/:id', cartController.deleteCart);

// Route: Update a specific cart item by ID
router.patch('/:id', cartController.updateCart);

// Route: Get details of a specific cart item by ID
router.get('/:id', cartController.getSingleCart);

module.exports = router;
