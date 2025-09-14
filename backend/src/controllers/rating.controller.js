const { Rating, Store, User } = require('../models');

const submitOrUpdate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { storeId, score, comment } = req.body;
    if (!storeId || !score) return res.status(400).json({ message: 'storeId and score required' });
    if (score < 1 || score > 5) return res.status(400).json({ message: 'Score must be 1-5' });

    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    // Upsert style
    let rating = await Rating.findOne({ where: { userId, storeId } });
    if (rating) {
      rating.score = score;
      rating.comment = comment;
      await rating.save();
    } else {
      rating = await Rating.create({ userId, storeId, score, comment });
    }
    res.json(rating);
  } catch (err) { next(err); }
};

const ratingsForStore = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const ratings = await Rating.findAll({ where: { storeId }, include: [{ model: User, attributes: ['id','name','email'] }] });
    res.json(ratings);
  } catch (err) { next(err); }
};

const ratingsByOwner = async (req, res, next) => {
  try {
    // list for store owner: all ratings for stores they own
    const ownerId = req.user.id;
    const stores = await Store.findAll({ where: { ownerId }, include: [{ model: Rating, include: [{ model: User, attributes: ['id','name','email'] }] }] });
    const result = stores.map(s => {
      const avg = s.Ratings.length ? (s.Ratings.reduce((a,b)=>a+b.score,0)/s.Ratings.length).toFixed(2) : null;
      return { store: s, averageRating: avg, ratings: s.Ratings };
    });
    res.json(result);
  } catch (err) { next(err); }
};

module.exports = { submitOrUpdate, ratingsForStore, ratingsByOwner };
