const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

const registerRouter = require('./routes/register');

const loginRouter = require('./routes/login');

const authenticateToken = require('./middleware/auth');

const PORT = 3000;

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@minigames.uaiydko.mongodb.net/${process.env.DB_NAME}`)

.then(() => {
    console.log('Połączono z bazą danych');
  })
  .catch((err) => {
    console.error('Błąd połączenia z bazą danych:', err);
  });


  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, './')));
  
  app.use('/routes/register', registerRouter);
  app.use('/routes/login', loginRouter);

  module.exports = app;