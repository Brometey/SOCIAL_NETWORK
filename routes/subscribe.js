const express = require('express');
const router = express.Router();

const {
  publish,
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
