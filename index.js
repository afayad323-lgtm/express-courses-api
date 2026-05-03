const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const courseRouter = require("./routes/courses.routes");

app.use("/api/courses", courseRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
