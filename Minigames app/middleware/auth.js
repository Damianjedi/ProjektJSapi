const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, process.env.JWT_KEY);
      next();
  } catch (err) {
      return res.status(403).json({wiadomosc: 'Błąd autoryzacji'});
  }
}
