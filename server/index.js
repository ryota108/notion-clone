const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5050;
require("dotenv").config();
// DB接続
app.use(express.json());
app.use("/api/v1",require("./src/v1/routes/auth"))

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch {
  console.log(error);
}



app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
