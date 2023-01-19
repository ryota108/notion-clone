import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link,Navigate, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate()
 
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [isLoading,setIsLoading] = useState(false)

  const submitHandler = async (e) =>{
    e.preventDefault()
    setUsernameErrText("");
    setPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let error = false;
 

   if(username === "") {
    error= true
    setUsernameErrText("名前を入力してください");
   } if(password === "") {
    error= true
    setPasswordErrText("パスワードを入力してください");
   }

   if(error) return;

   setIsLoading(true)

    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password
      });
      setIsLoading(false)
      localStorage.setItem("token",res.token)
      console.log("ログイン成功")
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
      <LoadingButton
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        type="submit"
        loading={isLoading}
        color="primary"
        variant="outlined"
      >
       ログイン
      </LoadingButton>
    </Box>
      <Button component={Link} to="/register">アカウントを持っていませんか？新規登録</Button>
      </>
  );
};

export default Login;