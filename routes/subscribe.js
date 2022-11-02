const express = require('express');
const router = express.Router();

const {
  subscribe,
  getSubscribers,
  deleteSubscriptions,
} = require('../controllers/subscribe');

router
  .route('/')
  .get(getSubscribers)
  .patch(subscribe)
  .delete(deleteSubscriptions);

module.exports = router;
