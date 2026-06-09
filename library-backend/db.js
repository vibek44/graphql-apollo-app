const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDatabase = async () => {
  try {
    console.log("connecting mongoDb...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected!");
  } catch (error) {
    console.log("error connecting MongoDb...", error.message);
  }
};
