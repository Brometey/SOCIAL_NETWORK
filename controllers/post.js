const Post = require('../models/Post');
const Profile = require('../models/Profile');
// support functions
const {
  getSubsArrayAndPosts,
  getPostsOnly,
  sortCommonArray,
} = require('../support_methods/post_logic');

// TODO: Increment getting also follows post
const getPosts = async (req, res) => {
  currentUserEmail = await res.locals.email;
  const currentUser = await Profile.findOne({ email: currentUserEmail });
  const userId = currentUser._id;
  let commonPostArray = [];

  //////////////////////////////////

  // if request have query string named date
  if (!req.query.datetime) {
    if (currentUser.subscriptions !== []) {
      await getSubsArrayAndPosts(
        commonPostArray,
        currentUser.subscriptions,
        currentUserEmail,
        ''
      );
    } else {
      await getPostsOnly(commonPostArray, userId);
    }
  } else {
    date = req.query.datetime;
    await getSubsArrayAndPosts(
      commonPostArray,
      currentUser.subscriptions,
      currentUserEmail,
      date
    );
  }

  // Now we have common array of posts so we need to sort all of them and take last 20 of them
  commonPostArray = await commonPostArray.flat();
  commonPostArray = await sortCommonArray(commonPostArray);
  await res.status(200).json(commonPostArray);
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
