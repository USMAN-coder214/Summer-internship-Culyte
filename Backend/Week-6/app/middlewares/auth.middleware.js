const jwt = require('jsonwebtoken');

// Protect routes that require a logged-in user
const authenticate = (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check that the header exists and uses Bearer authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Extract the token from:
    // Authorization: Bearer <token>
    const token = authHeader.split(' ')[1];

    // Verify the token and decode its payload
    const decoded = jwt.verify(
      token,
      'culyte-secret-key'
    );

    // Store the authenticated user's ID on the request
    req.userId = decoded.userId;

    // Continue to the next middleware/controller
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

module.exports = {
  authenticate
};