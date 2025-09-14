const express = require('express');
const router = express.Router();
const { createStore, listStores, storeDetails } = require('../controllers/store.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

// Admin adds stores or system admin maybe. Allow admin only to create store
router.post('/', authenticate, allowRoles('System Administrator'), createStore);

router.get('/', authenticate, listStores);
router.get('/:id', authenticate, storeDetails);

module.exports = router;
