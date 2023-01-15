import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link,Navigate, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate()
 
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [isLoading,setIsLoading] = useState(false)

  const submitHandler = async (e) =>{
    e.preventDefault()
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let error = false;
 

   if(username === "") {
    error= true
    setUsernameErrText("名前を入力してください");
   } if(password === "") {
    error= true
    setPasswordErrText("パスワードを入力してください");
   }
   if(confirmPassword === "") {
    error= true
    setConfirmErrText("確認用パスワードを入力してください");
   } 
   if(password !== confirmPassword){
    error= true
    setConfirmErrText("パスワードと確認用パスワードが異なります。")
   }

   if(error) return;

   setIsLoading(true)

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword
      });
      setIsLoading(false)
      localStorage.setItem("token",res.token)
      console.log("新規登録成功")
      navigate("/")
    } catch (err){
     const errors = err.data.errors;
     console.log(errors)

      errors.forEach((err)=>{
        if(err.param === "username"){
          setUsernameErrText(err.msg);
        }
        if(err.param === "password"){
          setPasswordErrText(err.msg);
        }
        if(err.param === "confirmPassword"){
          setConfirmErrText(err.msg);
        }
      })
      setIsLoading(false)
    }
  }

  return (
    <>
    <Box component="form" onSubmit={submitHandler} noValidate>
      <TextField
        fullWidth
        id="username"
        label="お名前"
        margin="normal"
        name="username"
        required
        helperText={usernameErrText}
        error={usernameErrText!==""}
        disabled={isLoading}
      />
      <TextField
        fullWidth
        id="password"
        type="password"
        label="パスワード"
        name="password"
        margin="normal"
        required
        helperText={passwordErrText}
        error={passwordErrText!==""}
        disabled={isLoading}
      />
      <TextField
        fullWidth
        id="confirmPassword"
        type="password"
        label="確認用パスワード"
        name="confirmPassword"
        margin="normal"
        required
        helperText={confirmErrText}
        error={confirmErrText!==""}
        disabled={isLoading}
      />
      <LoadingButton
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        type="submit"
        loading={isLoading}
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
