import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {

  const submitHandler = async (e) =>{
    e.preventDefault()
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("username").trim();


    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword
      });
      localStorage.setItem("token",res.token)
      console.log("新規登録成功")
    } catch (err){
     console.log(err)
    }
  }

  return (
    <>
    <Box component="form" onSubmit={submitHandler}>
      <TextField
        fullWidth
        id="username"
        label="お名前"
        margin="normal"
        name="username"
        required
      />
      <TextField
        fullWidth
        id="password"
        type="password"
        label="パスワード"
        name="password"
        margin="normal"
        required
      />
      <TextField
        fullWidth
        id="confirmPassword"
        type="password"
        label="確認用パスワード"
        name="confirmPassword"
        margin="normal"
        required
      />
      <LoadingButton
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        type="submit"
        loading={false}
        color="primary"
        variant="outlined"
      >
        アカウント作成
      </LoadingButton>
    </Box>
      <Button component={Link} to="/login">すでにアカウントを持っていますか？ログイン</Button>
      </>
  );
};

export default Register;
