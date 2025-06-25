const ClothingItem = require('../models/clothingItem');

const BadRequestError   = require('../errors/BadRequestError');
const ForbiddenError    = require('../errors/ForbiddenError');
const NotFoundError     = require('../errors/NotFoundError');

// GET /items
module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next); // pass any DB error to centralized handler
};

// POST /items
module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data for item creation'));
      }
      return next(err);
    });
};

// DELETE /items/:itemId
module.exports.deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Not authorized to delete this item');
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ message: 'Item deleted' })
      );
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(err);
    });
};

// PUT /items/:itemId/likes
module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(err);
    });
};

// DELETE /items/:itemId/likes
module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(err);
    });
};
