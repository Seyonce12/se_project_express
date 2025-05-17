const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItems');

// GET /items - Get all clothing items
router.get('/', getClothingItems);

// POST /items - Create a new clothing item
router.post('/', auth, createClothingItem);

// DELETE /items/:itemId - Delete a clothing item
router.delete('/:itemId', auth, deleteClothingItem);

// PUT /items/:itemId/likes - Like a clothing item
router.put('/:itemId/likes', auth, likeItem);

// DELETE /items/:itemId/likes - Dislike a clothing item
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;