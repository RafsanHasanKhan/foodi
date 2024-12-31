// get all users
const Users = require('../models/Users');

// post a new user
const createUser = async (req, res) => {
  const {name, email, photoURL, role} = req.body;

  // console.log('Request body:', req.body);
  const query = { email: email };
  
  try {
    // Check if the user already exists by email
    const existingUser = await Users.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: 'User already exists' });
    }

    // Create the new user if they don't exist
    const result = await Users.create({name, email, photoURL, role} );
    return res.status(201).json({ message: 'User created successfully', user: result }); // Status 201 for created resources
    
  } catch (error) {
    // Handle errors if any
    return res.status(500).json({ message: error.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', deletedUser }); // Fixed
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// make admin
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' }); // Fixed
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  console.log(query);
  try {
    const user = await Users.findOne(query);
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const admin = user && user.role === 'admin'; // Fixed
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
};