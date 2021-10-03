import {
  Box,
  Button,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { auth } from "../firebase/config"
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import UserContext from "../utils/UserContext";

export default function Login() {

  let history = useHistory();
  const {setUser} = useContext(UserContext)
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setLoginInfo({
      ...loginInfo,
      showPassword: !loginInfo.showPassword,
    });
  };

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginInfo);
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        setUser(res.user);
        sessionStorage.setItem("currentUser", JSON.stringify(res.user));
        history.push("/chat");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ margin: "1rem" }}
    >
      <h2 className="mb-4 pt-3">LOGIN</h2>
      <TextField
        id="input-with-icon-textfield"
        label="Email"
        name="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        sx={{ m:"0.5rem 0" }}
      />

      <FormControl sx={{ m:"0.5rem 0" }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={loginInfo.showPassword ? "text" : "password"}
          value={loginInfo.password}
          onChange={handleChange}
          name="password"
          startAdornment={
            <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
          }

          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {loginInfo.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button type="submit" className="btn" fullWidth sx={{ m:"0.5rem 0" }}>
        Login
      </Button>
      <Button  className="btn" fullWidth onClick={googleLogin}>
        Login in with Google
      </Button>
      <Typography variant="subtitle1" sx={{ m:"0.5rem 0" }}>
       Create a free Account! <Link to="/signup">sign up</Link>
      </Typography>
      
    </Box>
  );
}
