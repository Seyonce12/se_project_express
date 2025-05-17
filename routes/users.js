const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateProfile, getCurrentUser } = require('../controllers/users');

// GET /users/:userId - Get user by ID
router.get('/:userId', getCurrentUser);

// PATCH /users/me - Update current user profile
router.patch('/me', auth, updateProfile);


module.exports = router;