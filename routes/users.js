const router = require('express').Router();
const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserUpdate } = require('../middlewares/validation');

// GET /users/me  (current user)
router.get('/me', auth, getCurrentUser);

// PATCH /users/me
router.patch('/me', auth, validateUserUpdate, updateProfile);

module.exports = router;
