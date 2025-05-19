const router = require('express').Router();
const { updateProfile, getCurrentUser } = require('../controllers/users');

// GET /users/:userId - Get user by ID
router.get('/me', getCurrentUser);

// PATCH /users/me - Update current user profile
router.patch('/me', updateProfile);


module.exports = router;