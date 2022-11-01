const Post = require('../models/Post');
const Profile = require('../models/Profile');

// Increment getting also follows post
const getPosts = async (req, res) => {
  // get current User s email
  currentUser = await res.locals.email;

  // Get id from current user
  const { _id: profileId } = await Profile.findOne({ email: currentUser });

  let postArray;
  let messArray;

  // if query string have datetime
  if (req.query.datetime) {
    // get posts from certain date
    date = req.query.datetime;

    postArray = await Post.find({
      createdAt: { $gte: date },
      createdBy: profileId,
    });
  } else {
    // Get only current user s 20 posts
    postArray = await Post.find({ createdBy: profileId })
      .sort({ createdAt: -1 })
      .limit(20);
  }
  messArray = postArray.map((item) => item.message);
  res.status(200).json({ messArray });
};

const createPost = async (req, res) => {
  // set createdBy header in request
  req.body.createdBy = req.profile.profileId;
  const _createdBy = req.body.createdBy;

  // creating post using mongo
  const post = await Post.create({
    message: req.body.message,
    createdBy: _createdBy,
  });

  res.status(201).json({ post });
};
module.exports = { getPosts, createPost };
