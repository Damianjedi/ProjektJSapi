const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło.' });

    
    }

    const hashedPassword = existingUser.password;

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło.' });

    }

    const token = jwt.sign({ userId: existingUser._id }, 'kluczTajny', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});

module.exports = loginRouter;
