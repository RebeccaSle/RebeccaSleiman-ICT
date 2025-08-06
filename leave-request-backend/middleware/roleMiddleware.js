function checkRole(requiredRole) {
  return (req, res, next) => {
    const { role } = req.body; // to be replaced with the jwt (or session based on what is used)
    if (role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
}

module.exports = checkRole;
