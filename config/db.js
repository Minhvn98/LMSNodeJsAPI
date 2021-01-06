const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connect database success !!!');
  } catch (error) {
    console.log('Connect database failed !!!');
    next(error);
  }
}

module.exports = { connect };
