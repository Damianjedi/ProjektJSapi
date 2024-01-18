const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Użytkownik o tej nazwie już istnieje.' });
    } else {

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Rejestracja udana.' });

    }
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});

module.exports = registerRouter;
