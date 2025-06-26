const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  validateSignUp,
  validateSignIn,
} = require('../middlewares/validation');

// public auth routes
router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

// protected sub-routers
router.use('/users', userRouter);          // auth inside sub-router
router.use('/items', clothingItemRouter);  // auth inside sub-router

// Unknown route
router.use('*', (req, res, next) =>
  next(new NotFoundError('Requested resource not found'))
);

module.exports = router;
