const router = require('express').Router();
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
router.post('/', createClothingItem);

// DELETE /items/:itemId - Delete a clothing item
router.delete('/:itemId', deleteClothingItem);

// PUT /items/:itemId/likes - Like a clothing item
router.put('/:itemId/likes', likeItem);

// DELETE /items/:itemId/likes - Dislike a clothing item
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;