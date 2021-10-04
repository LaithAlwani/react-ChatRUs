import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

export default function Signup() {
  let history = useHistory();
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [message, setMessage] = useState("");
  const handleClickShowPassword = () => {
    setSignupInfo({
      ...signupInfo,
      showPassword: !signupInfo.showPassword,
    });
  };

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupInfo.password === signupInfo.confirmPassword) {
      createUserWithEmailAndPassword(
        auth,
        signupInfo.email,
        signupInfo.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: signupInfo.username,
            photoURL: "user-image.png",
          });
          setMessage("Sign up Compeleted!");
          setTimeout(() => {
            setMessage("");
            history.push("/login");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setMessage("Email Already Exsists");
          setTimeout(() => {
            setMessage("");
          }, 2000);
        });
    } else {
      console.log("Error Passowrds don't match");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        margin: "1rem ",
        ["@media (min-width:768px)"]: { width: "50%", margin: "auto" },
      }}
    >
      <h2 className="mb-4 pt-3">SIGN UP</h2>
      {message && (
        <Alert
          severity={message === "Sign up Compeleted!" ? "success" : "error"}
          sx={{ mt: 1 }}
        >
          {message}
        </Alert>
      )}
      <TextField
        id="input-with-icon-textfield"
        label="Username"
        name="username"
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
        sx={{ m: "0.5rem 0" }}
      />
      <TextField
        id="input-with-icon-textfield"
        type="email"
        label="Email"
        name="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        sx={{ m: "0.5rem 0" }}
      />

      <FormControl sx={{ m: "0.5rem 0" }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={signupInfo.showPassword ? "text" : "password"}
          value={signupInfo.password}
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
                {signupInfo.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <TextField
        id="input-with-icon-textfield"
        type="password"
        label="Confrim Password"
        name="confirmPassword"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        sx={{ m: "0.5rem 0" }}
      />

      <Button type="submit" className="btn" fullWidth sx={{ m: "0.5rem 0" }}>
        Sign up
      </Button>
      <Typography variant="subtitle1" sx={{ m: "0.5rem 0" }}>
        Already have an Account! <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
}
