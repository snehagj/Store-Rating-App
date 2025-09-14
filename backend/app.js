const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const storeRoutes = require('./src/routes/store.routes');
const ratingRoutes = require('./src/routes/rating.routes');
const { errorHandler } = require('./src/middleware/error.middleware');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

app.get('/', (req, res) => res.json({ message: 'Store Rating API' }));

app.use(errorHandler);

module.exports = app;
