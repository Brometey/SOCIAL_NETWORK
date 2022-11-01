const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    req.profile = {
      profileId: payload.profileId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      created: payload.created,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
