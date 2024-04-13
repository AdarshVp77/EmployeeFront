import React, { useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { Box, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]*$/;
    return passwordRegex.test(password);
  };

  const validateLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("All fields are required.");
      return false;
    }

    if (!validatePassword(password)) {
      setError("Password must contain only letters and numbers.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      axios
        .post("https://emp-fhhr.onrender.com/employees/login", { username, password })
        .then((result) => {
          console.log(result);
          if (result.data === "success") {
            console.log(result.headers);
            navigate("/home");
          } else {
            setError("Invalid username or password");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="signup-container">
      <h2 style={{ textAlign: "center", fontSize: "22px" }}> User Login</h2>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                fullWidth
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
  type="submit"
  variant="contained"
  style={{
    margin: "20px auto",
    display: "block",
    backgroundColor: "#1C1678", 
    color: "#FFFFFF", 
   
  }}
>
  Login
</Button>

        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <p style={{textAlign:"center"}}>If you are new here, Register  </p>
        <Button
          variant="contained"
          style={{ margin: "20px auto", display: "block" }}
        >
          <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
            Register
          </Link>
        </Button>
        <p style={{textAlign:"center"}}>Admin?  </p>
        <Button
          variant="contained"
          style={{ margin: "20px auto", display: "block" }}
        >
          <Link to="/admin/login" style={{ color: "white", textDecoration: "none" }}>
            Admin Login
          </Link>
        </Button>
      </Box>
    </div>
  );
};

export default Login;