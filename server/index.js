const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { chats } = require("./data/data.js");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
connectDB();
app.use(express.json()); // tell our server to accept server data from frontend/client
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.get("/", (req, res) => {
  console.log("API is running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
