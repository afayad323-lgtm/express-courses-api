require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");

console.log("ENV:", process.env.MONGO_URL);
console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongodb connected success");
});
app.use(express.json());
const port = 3000;

const courseRouter = require("./routes/courses.routes");

app.use("/api/courses", courseRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
