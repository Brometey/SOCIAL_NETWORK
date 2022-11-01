const Profile = require('../models/Profile');

const login = async (req, res, next) => {
  const { email } = res.locals;

  // Find user by this email
  const profile = await Profile.findOrCreate({
    email: email,
  });
  if (!profile) {
    throw new Error('Invalid credentials');
  }

  // set created in profile doc
  profile.doc.created = profile.created;

  // create token for him
  const token = profile.doc.createJWT();

  // write token down in headers
  req.headers.authorization = `Bearer ${token}`;
  next();
};

// need that function as middleware for prechecking
// token in some routes
const preCheck = async (req, res, next) => {
  const { email } = res.locals;

  // looking for profile , comparing by em emails
  const profile = await Profile.findOne({ email });
  if (!profile) {
    throw new Error('Invalid Authentication');
  }

  // creating token
  const token = profile.createJWT();
  req.headers.authorization = `Bearer ${token}`;
  next();
};
module.exports = { login, preCheck };
