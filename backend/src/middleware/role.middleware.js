const allowRoles = (...allowedRoles) => (req, res, next) => {
  const roleName = req.user?.Role?.name;
  if (!roleName || !allowedRoles.includes(roleName)) {
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  }
  next();
};

module.exports = { allowRoles };
