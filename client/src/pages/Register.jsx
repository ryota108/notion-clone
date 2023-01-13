import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
    <Box component="form">
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
