const { Store, Rating, User, sequelize } = require('../models');
const { storeCreate } = require('../validators/store.validator');
const { Op } = require('sequelize');

const createStore = async (req, res, next) => {
  try {
    const { error, value } = storeCreate.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const store = await Store.create(value);
    res.json(store);
  } catch (err) { next(err); }
};

const listStores = async (req, res, next) => {
  try {
    const { q, page = 1, pageSize = 20 } = req.query;
    const where = {};
    if (q) where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { address: { [Op.iLike]: `%${q}%` } }
    ];
    const stores = await Store.findAndCountAll({
      where,
      include: [{ model: Rating }]
    });
    // Attach average rating and user's rating if user authenticated
    const items = stores.rows.map(s => {
      const avg = s.Ratings.length ? (s.Ratings.reduce((a,b)=>a+b.score,0)/s.Ratings.length) : null;
      return { id: s.id, name: s.name, address: s.address, email: s.email, ownerId: s.ownerId, averageRating: avg };
    });
    res.json({ count: stores.count, rows: items });
  } catch (err) { next(err); }
};

const storeDetails = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [{ model: Rating, include: [{ model: User, attributes: ['id','name','email'] }] }]
    });
    if (!store) return res.status(404).json({ message: 'Not found' });
    const avg = store.Ratings.length ? (store.Ratings.reduce((a,b)=>a+b.score,0)/store.Ratings.length).toFixed(2) : null;
    res.json({ store, averageRating: avg });
  } catch (err) { next(err); }
};

module.exports = { createStore, listStores, storeDetails };
