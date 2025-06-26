const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItems');
const {
  validateItemId,
  validateItemBody,
} = require('../middlewares/validation');

// GET /items
router.get('/', getClothingItems);

// POST /items
router.post('/', auth, validateItemBody, createClothingItem);

// DELETE /items/:itemId
router.delete('/:itemId', auth, validateItemId, deleteClothingItem);

// LIKE /items/:itemId/likes
router.put('/:itemId/likes', auth, validateItemId, likeItem);

// DISLIKE /items/:itemId/likes
router.delete('/:itemId/likes', auth, validateItemId, dislikeItem);

module.exports = router;
