const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Signup business logic
const signup = async (name, email, password) => {

  // Check if an account with this email already exists
  const existingUser = await User.findOne({
    where: { email }
  });

  // Stop signup if the email is already registered
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Convert the plain password into a secure bcrypt hash
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // Return the newly created user
  return user;
};
//Login
// Login business logic
const login = async (email, password) => {

  // Find the user using the email
  const user = await User.findOne({
    where: { email }
  });

  // Stop if the email does not exist
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the password entered by the user
  // with the bcrypt hash stored in the database
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  // Stop if the password is incorrect
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  // Create a JWT containing the user's ID
 const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

  // Return the user and token
  return {
    user,
    token
  };
};
module.exports = {
  signup,
  login
};