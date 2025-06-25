const db = require('../models');
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) return res.status(404).json({ message: 'User not found for their updation'});

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id }
    });

    if (!deletedUser){
        return res.status(404).json({ message: 'User not found'});
    } 

    res.status(201).json({ message: 'User deleted successfully', deletedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error"});
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if(!name || !email || !password){
    return res.status(404).json({message: "All fields are required"});
  }

  try {
    // check if email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    // if(password.length >= 8){
    //   return res.status(200).json({message: "valid password created"});
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(404).json({message: "All fields are required"});
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1hr'
    });

    res.json({ token, 
                user: { id: user.id, name: user.name, email: user.email } 
            });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};