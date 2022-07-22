const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
       
    }); 
    console.log(`Mongo DB Connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectDB;