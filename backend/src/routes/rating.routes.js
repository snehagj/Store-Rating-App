const express = require('express');
const router = express.Router();
const { submitOrUpdate, ratingsForStore, ratingsByOwner } = require('../controllers/rating.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

router.post('/', authenticate, allowRoles('Normal User'), submitOrUpdate);
router.get('/store/:storeId', authenticate, ratingsForStore);
router.get('/owner/ratings', authenticate, allowRoles('Store Owner'), ratingsByOwner);

module.exports = router;
