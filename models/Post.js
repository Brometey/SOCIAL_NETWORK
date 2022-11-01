const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Please provide the message '],
      maxLength: 280,
    },
    createdBy: {
      // Every message we ll create will be associated with the certain user
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please provide the user'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', PostSchema);
