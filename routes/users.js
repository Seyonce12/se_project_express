const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

// GET /users - Get all users
router.get('/', getUsers);

// GET /users/:userId - Get user by ID
router.get('/:userId', getUserById);

// POST /users - Create new user
router.post('/', createUser);

module.exports = router;