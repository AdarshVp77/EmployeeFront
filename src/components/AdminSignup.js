import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateSignup = () => {
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateSignup()) {
      return;
    }

    axios
      .post("https://emp-fhhr.onrender.com/admin/admin/signup", {
        name,
        email,
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/admin/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <h2 style={{ textAlign: "center", fontSize: "22px" }}>Admin Sign Up</h2>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
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
            Sign Up
          </Button>
        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </Box>
    </div>
  );
};

export default AdminSignup;