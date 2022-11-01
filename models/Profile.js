const jwt = require('jsonwebtoken');
const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
    default: 'John',
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
    default: 'Doe',
  },
  subscribers: {
    type: Array,
    default: [],
  },
  subscriptions: {
    type: Array,
    default: [],
  },
});

// I need it for find email or otherwise create it
ProfileSchema.plugin(findOrCreate);

// Create jwt token for further use
ProfileSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      profileId: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      created: this.created,
      subscribers: this.subscribers,
      subscriptions: this.subscriptions,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model('Profile', ProfileSchema);
