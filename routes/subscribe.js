const express = require('express');
const router = express.Router();

const {
  subscribe,
  getSubscribers,
  deleteSubs,
} = require('../controllers/subscribe');

router.route('/').get(getSubscribers).patch(subscribe);
router.route('/delete').post(deleteSubs);
module.exports = router;
