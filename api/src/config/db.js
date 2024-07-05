const mongoose = require("mongoose");
const Env = process.env.NODE_ENV;

let DBURI;

if (Env === "development") {
  DBURI = process.env.MONGO_URI_LOCAL_DEV;
} else {
  DBURI = process.env.MONGO_URI_PROD;
}

const connectDB = async () => {
  const conn = await mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
