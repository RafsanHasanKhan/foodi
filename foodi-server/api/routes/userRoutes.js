const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers.js');
const verifyToken = require('../middlewares/verifyToken.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js')

router.get('/',verifyToken,verifyAdmin, userControllers.getAllUsers);
router.post('/', userControllers.createUser);
router.delete('/:id', verifyToken,verifyAdmin, userControllers.deleteUser);
router.patch('/admin/:id', verifyToken,verifyAdmin, userControllers.makeAdmin);
router.get('/admin/:email', verifyToken, userControllers.getAdmin);

module.exports = router;