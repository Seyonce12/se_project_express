const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, CONFLICT } = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

// Get user by ID
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid user ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      avatar,
      email,
      password: hash
    }))
    .then(user => res.send({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      _id: user._id
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid data for user creation' });
      } else if (err.code === 11000) {
        res.status(CONFLICT).send({ message: 'Email already exists' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });


};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ message: 'Email and password are required' });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED).send({ message: 'Incorrect email or password' });
      }
      
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid data for profile update' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid user ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  createUser,
  login
};