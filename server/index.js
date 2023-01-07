const express = require("express");
const mongoose = require("mongoose");
const app = express();
const JWT = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const PORT = 5050;
require("dotenv").config();
const CryptoJS = require("crypto-js");
const User = require("./src/v1/models/user");
// DB接続
app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch {
  console.log(error);
}

// ユーザー新規登録API
app.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は８文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは８文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは８文字以上である必要があります"),
    body("username").custom((value)=>{
        return User.findOne({username:value}).then((user)=>{
            if(user){
                return Promise.reject("このユーザーは既に使われています")
            }
        })
    }),
    (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
     next();
    },
  async (req, res) => {
    const password = req.body.password;

    try {
      // パスワードの暗号化
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      // ユーザーの新規登録
      const user = await User.create(req.body);
      // JWTの発行
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);
// ユーザーログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
