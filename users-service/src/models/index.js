/* eslint-disable no-console */
const mongoose = require('mongoose');
const userSchema = require('./user');

const User = mongoose.model('User', userSchema);

const connectToDb = async (mongoUri, dbName) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
};

module.exports = {
  connectToDb,
  User,
};
