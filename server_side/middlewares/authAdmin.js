export const verifyAdmin = (req, res, next) => {
    const { role } = req.user; // Assuming `req.user` is populated after authentication
  
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  
    next();
  };
  