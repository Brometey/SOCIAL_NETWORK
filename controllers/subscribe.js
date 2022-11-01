// TODO: Refactor this code , implement subscribe as third function

const Post = require('../models/Post');
const Profile = require('../models/Profile');

const publish = async (req, res) => {};

// Subscribe implementation
const subscribe = async (req, res) => {
  // get follower and followed one
  const follower = await Profile.findOne({ email: res.locals.email });
  const followed = await Profile.findOne({ email: req.body.email });

  //get followerId and followedId
  const followerId = await follower._id;
  const followedId = await followed._id;

  // add current user to subscribers array
  if (followed.subscribers.includes(follower.email)) {
    throw new Error("U've already following this user");
  }
  followed.subscribers.push(follower.email);
  const newSubscriberAdded = {
    subscribers: followed.subscribers,
  };
  const addedTo = await Profile.findByIdAndUpdate(
    { _id: followedId },
    newSubscriberAdded,
    { new: true, runValidators: true }
  );

  // add one who was followed to subscriptions list
  follower.subscriptions.push(followed.email);
  const newSubcriptionAdded = {
    subscriptions: follower.subscriptions,
  };
  const wasAdded = await Profile.findByIdAndUpdate(
    { _id: followerId },
    newSubcriptionAdded,
    { new: true, runValidators: true }
  );

  res.status(200).json({ addedTo, wasAdded });
};

const getSubscribers = async (req, res) => {
  res.status(200).send('Get subscribers');
};

const deleteSubscriptions = async (req, res) => {
  res.status(200).send('delete subscriptions');
};

module.exports = { publish, subscribe, getSubscribers, deleteSubscriptions };
