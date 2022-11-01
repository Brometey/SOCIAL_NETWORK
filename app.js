require('dotenv').config();
const { profile } = require('console');
const express = require('express');
const { nextTick } = require('process');
const app = express();

// connectDB
const connectDB = require('./db/connect');

// support methods
const transferEmail = async (req, res, next) => {
  res.locals.email = req.params['email'];
  if (!res.locals.email) throw new Error('Please provide email');
  next();
};

//routers
const profileRouter = require('./routes/profile');
const postsRouter = require('./routes/post');
const subscribeRouter = require('./routes/subscribe');

// middlewares
const authenticateUser = require('./middleware/authentication');

app.use(express.json());

// Some needed methods
const { login, preCheck } = require('./controllers/auth');

// Identification
app.use('/blog/:email', transferEmail);

//routes
app.use('/blog/:email/profile', login, authenticateUser, profileRouter);
app.use('/blog/:email/posts', preCheck, authenticateUser, postsRouter);
app.use('/blog/:email/subscribe', preCheck, authenticateUser, subscribeRouter);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, '192.168.88.73', () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
