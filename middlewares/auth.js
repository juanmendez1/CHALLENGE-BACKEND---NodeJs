const jwt = require('jsonwebtoken');

module.exports = (req, _, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1];
    const decodedToken = jwt.verify(token, 'ultrasecreto');
    if (!decodedToken) {
      const err = new Error('Not authenticated');
      err.status = 401;
      throw err;
    }
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    err.status = err.status ?? 500;
    throw err;
  }
};
