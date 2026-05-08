const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const httpStatusText = require("./utils/httpstatusText");

console.log("ENV:", process.env.MONGO_URL);
console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongodb connected success");
});
app.use(express.json());
app.use(cors());
const port = 3000;

const courseRouter = require("./routes/courses.routes");
const userRouter = require("./routes/users.routes");

app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);
app.use((req, res) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource isn't available",
  });
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
