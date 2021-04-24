require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// Router
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running in PORT", PORT);
});

//Connect MongoDB
const URI = process.env.MOMNGO_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);
