const router = require('express').Router();
const { getCurrentUser } = require('../controllers/users.js');

router.get('/me', getCurrentUser);

module.exports = router;
