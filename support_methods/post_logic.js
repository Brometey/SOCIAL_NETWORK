const Profile = require('../models/Profile');
const Post = require('../models/Post');

const getSubsArrayAndPosts = async function (
  commonArray,
  subscriptions,
  email,
  date
) {
  await subscriptions.push(email);
  for (let i = 0; i < subscriptions.length; i++) {
    const { _id } = await Profile.findOne({ email: subscriptions[i] });

    let postArray =
      date === ''
        ? await Post.find({ createdBy: _id })
        : await Post.find({
            $and: [{ createdBy: _id }, { createdAt: { $gte: date } }],
          });

    postArray = await postArray.map((item) => {
      return {
        message: item.message,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
      };
    });
    await commonArray.push(postArray);
  }
};
const getPostsOnly = async function (commonArray, id) {
  commonArray = await Post.find({ createdBy: id })
    .sort({ createdAt: -1 })
    .limit(20);

  commonArray = commonArray.map((item) => {
    return {
      message: item.message,
      createdAt: item.createdAt,
      createdBy: item.createdBy,
    };
  });
};
const sortCommonArray = async function (commonArray) {
  return await commonArray
    .sort((post1, post2) => {
      const date1 = new Date(post1.createdAt);
      const date2 = new Date(post2.createdAt);

      return date2 - date1;
    })
    .slice(0, 20);
};

module.exports = { getSubsArrayAndPosts, getPostsOnly, sortCommonArray };
