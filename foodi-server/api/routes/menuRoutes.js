const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

const menuControllers = require('../controllers/menuControllers');

// get all menu items form database

router.get('/', menuControllers.getAllMenuItems);

module.exports = router;
