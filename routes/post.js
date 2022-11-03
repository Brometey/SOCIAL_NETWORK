const express = require('express');
const router = express.Router();

const { getPosts, createPost } = require('../controllers/post');

router.route('/').get(getPosts).post(createPost);
module.exports = router;
