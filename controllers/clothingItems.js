const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' }));
};

// Create a new clothing item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid data for item creation' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });
};

// Delete a clothing item
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  
  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error('Item not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      // Check if current user is the owner of the item
      if (item.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Not authorized to delete this item' });
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.send({ message: 'Item deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });
};

// Like an item
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Item not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });
};

// Dislike an item
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Item not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid item ID' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};