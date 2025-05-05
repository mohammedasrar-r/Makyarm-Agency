const express = require('express');
const { sendRequest, getNotifications } = require('../controllers/notification.controller');
const router = express.Router();

router.post('/request', sendRequest);
router.get('/notifications/:userId', getNotifications);

module.exports = router;
