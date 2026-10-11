const authService = require('../services/auth.service');

// Handle the signup HTTP request
const signup = async (req, res) => {
  try {
    // Get the signup data sent by the client
    const { name, email, password } = req.body;
// Validate required fields
if (!name || !email || !password) {
  return res.status(400).json({
    message: 'name, email and password are required'
  });
}

// Validate name
if (typeof name !== 'string' || !name.trim()) {
  return res.status(400).json({
    message: 'name must be a valid text value'
  });
}

// Validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: 'email must be a valid email address'
  });
}

// Validate password
if (typeof password !== 'string' || password.length < 6) {
  return res.status(400).json({
    message: 'password must be at least 6 characters long'
  });
}
    // Send the data to the service layer
    const user = await authService.signup(name, email, password);

    // Send a successful response back to the client
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    // Send an error response if signup fails
    res.status(400).json({
      message: error.message
    });
  }
};
//Login
// Handle the login HTTP request
const login = async (req, res) => {
  try {
    // Get email and password from the request body
    const { email, password } = req.body;
    // Validate required fields
if (!email || !password) {
  return res.status(400).json({
    message: 'email and password are required'
  });
}

// Validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: 'email must be a valid email address'
  });
}

// Validate password
if (typeof password !== 'string' || password.length < 6) {
  return res.status(400).json({
    message: 'password must be at least 6 characters long'
  });
}

    // Send the credentials to the service layer
    const result = await authService.login(email, password);

    // Send only safe user information back to the client
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email
      },
      token: result.token
    });
  } catch (error) {
    // Send an error response if login fails
    res.status(401).json({
      message: error.message
    });
  }
};
module.exports = {
  signup,
  login
};