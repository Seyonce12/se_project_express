const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { login, createUser } = require('../controllers/users');
const { NOT_FOUND } = require('../utils/errors');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const {
  validateSignUp,
  validateSignIn,
  validateItemId,
  validateItemBody,
  validateUserUpdate,
} = require('../middlewares/validation');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.post('/items', auth, validateItemBody, createClothingItem);
router.delete('/items/:itemId', auth, validateItemId, deleteClothingItem);
router.put('/items/:itemId/likes', auth, validateItemId, likeItem);
router.delete('/items/:itemId/likes', auth, validateItemId, dislikeItem);

router.patch('/users/me', auth, validateUserUpdate, updateProfile);

router.use('*', (req, res, next) => next(new NotFoundError('Requested resource not found')));

module.exports = router;