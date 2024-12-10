
import React, { useState } from "react";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import "./Signup.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});


  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    let isValid = true;
    let validationErrors = {};

    if (user.username === "") {
      isValid = false;
      validationErrors.username = "Name is required";
    }

    if (user.email === "") {
      isValid = false;

      validationErrors.email = "Email is required";
    } else if (!validateEmail(user.email)) {
      isValid = false;
      validationErrors.email = "Invalid email format";
    }

    if (user.password === "") {
      isValid = false;
      validationErrors.password = "Password is required";
    } else if (!validatePassword(user.password)) {
      isValid = false;
      validationErrors.password =
        "Password must be at least 8 characters and must have at least one uppercase letter, one number, and one special symbol";
    }

    setErrors(validationErrors);

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/signup", user);
      if (response.status === 200) {
        alert("User created successfully");
        setUser({ username: "", email: "", password: "" });
        navigate('/login');
        setErrors({});
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        let validationErrors = { ...errors };
        if (err.response.data.field === "username") {
          validationErrors.username = "Username already exists";
        } else {
          validationErrors.email = err.response.data.message;
        }
        setErrors(validationErrors); 
      } else {
        alert("Something went wrong");
      }
    }
  };

  const setInputData = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="Login-Main-div">
      <div className="img-container">
        <img src="N_Logo.jpg" alt="img not found" />
      </div>
      <h2 style={{ position: "relative", left: "80px" }}>
        Create a New Account
      </h2>
      <p style={{ marginLeft: "10px", marginTop: "-14px" }}>
        Welcome To The India's Largest Online Fashion Store
      </p>

      <div className="text-field">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
            gap: "10px",
            marginTop: "4px",
          }}
        >
          <TextField
            onChange={setInputData}
            name="username"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={user.username}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
          />

          <TextField
            name="email"
            onChange={setInputData}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={user.email}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            name="password"
            onChange={setInputData}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={user.password}
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={passwordToggle}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            sx={{ background: "#4F62FE", color: "black" }}
            variant="contained"
            onClick={submit}
          >
            Sign Up
          </Button>

          <p style={{ marginLeft: "55px", marginTop: "5px" }}>
            Already have an account?{" "}
            <a style={{ textDecoration: "none" }} href="/login">
              Log In
            </a>
          </p>

          <div className="divider">
            <hr className="line" />
            <span>OR</span>
            <hr className="line" />
          </div>
          <button className="social-button">
            <img src="google.png" alt="." width="30px" /> Log in with Google
          </button>
          <button className="social-button">
            <img src="facebook.png" width="30px" /> Log in with Facebook
          </button>
          <button className="social-button">
            <img src="twitter.png" alt="." width="30px" /> Log in with Twitter
          </button>
        </Box>
      </div>
    </div>
  );
}
