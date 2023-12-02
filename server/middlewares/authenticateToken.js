import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret123';

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ status: 'error', error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
