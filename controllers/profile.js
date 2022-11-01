const Profile = require('../models/Profile');

// Get access to profile
const getProfile = async (req, res) => {
  // show data only if profile was not just created
  if (req.profile.created === false) res.status(200).json(req.profile);
  else res.status(200).json('Profile created');
};

// Update firstName and lastName
const updateProfile = async (req, res) => {
  // Get data from request for further using
  const {
    body: { firstName, lastName },
    profile: { profileId },
  } = req;

  if (firstName === '' || lastName === '') {
    throw new Error('Please provide yout first name and last name');
  }

  // update data using previous one
  const profile = await Profile.findByIdAndUpdate(
    { _id: profileId },
    // insert updated data
    req.body,
    { new: true, runValidators: true }
  );

  if (!profile) {
    throw new Error('No profile');
  }
  res.status(200).json({ profile });
};

module.exports = { getProfile, updateProfile };
