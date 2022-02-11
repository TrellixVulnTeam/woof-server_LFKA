const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRouter = require("./routers/postRouter");

const mongoConnection =
  "mongodb+srv://benoson:benosispro1@juno-tune-42.ik7dx.mongodb.net/woof?authSource=admin&replicaSet=atlas-vz2lyu-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(mongoConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const port = 3015;
app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
