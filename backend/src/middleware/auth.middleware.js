const { verify } = require('../utils/jwt');
const { User, Role } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Authorization header required' });
    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const decoded = verify(token);
    const user = await User.findByPk(decoded.id, { include: Role });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid/Expired token', error: err.message });
  }
};

module.exports = { authenticate };
