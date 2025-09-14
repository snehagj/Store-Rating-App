const bcrypt = require('bcrypt');
const { User, Store, Rating, Role, sequelize } = require('../models');
const { Op } = require('sequelize');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

const dashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) { next(err); }
};

const addUser = async (req, res, next) => {
  try {
    const { name, email, password, address, roleName } = req.body;
    if (!name || !email || !password || !roleName) return res.status(400).json({ message: 'Missing fields' });
    if (name.length < 20 || name.length > 60) return res.status(400).json({ message: 'Name length invalid' });
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) return res.status(400).json({ message: 'Invalid role' });
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, password: hash, address, roleId: role.id });
    res.json({ user });
  } catch (err) { next(err); }
};

const listUsers = async (req, res, next) => {
  try {
    const { name, email, address, role, page = 1, pageSize = 20 } = req.query;
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    if (address) where.address = { [Op.iLike]: `%${address}%` };
    const include = [{ model: Role }];
    if (role) include[0].where = { name: role };
    const users = await User.findAndCountAll({
      where,
      include,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
    res.json(users);
  } catch (err) { next(err); }
};

const listStores = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      include: [
        { model: Rating },
      ]
    });
    // compute overall rating
    const result = stores.map(s => {
      const avg = s.Ratings.length ? (s.Ratings.reduce((a,b)=>a+b.score,0)/s.Ratings.length).toFixed(2) : null;
      return { id: s.id, name: s.name, email: s.email, address: s.address, rating: avg };
    });
    res.json(result);
  } catch (err) { next(err); }
};

module.exports = { dashboard, addUser, listUsers, listStores };
