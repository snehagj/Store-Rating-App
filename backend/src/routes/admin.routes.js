const express = require('express');
const router = express.Router();
const { dashboard, addUser, listUsers, listStores } = require('../controllers/admin.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

router.use(authenticate, allowRoles('System Administrator'));

router.get('/dashboard', dashboard);
router.post('/users', addUser);
router.get('/users', listUsers);
router.get('/stores', listStores);

module.exports = router;
