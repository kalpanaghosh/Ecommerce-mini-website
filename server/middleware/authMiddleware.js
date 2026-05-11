const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ensure we have a valid ID. Check for both id and _id in token payload.
      const userId = decoded.id || decoded._id || decoded.sub;
      
      if (!userId) {
        return res.status(401).json({ message: 'Not authorized, invalid token payload' });
      }

      req.user = {
        id: userId
      };
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };