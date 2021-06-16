require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CON, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

//routes
const authRoute = require("./routes/auth");
const checkoutGames = require("./routes/checkout");
const gamesRoute = require("./routes/games");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/user", authRoute);

app.use("/games", gamesRoute);
app.use("/checkout", checkoutGames);
app.get("/", (req, res) => {
  res.send("server is online!");
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
