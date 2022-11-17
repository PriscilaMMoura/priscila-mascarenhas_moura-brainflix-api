require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT;
const videosRouter = require("./routes/videos");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/videos", videosRouter);
app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
