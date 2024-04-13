import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://emp-fhhr.onrender.com/admin/admin/login", {
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data.token) {
          sessionStorage.setItem("userToken", result.data.token);
          console.log(result.data.token);
          navigate("/empapp"); 
        } else {
          setError("Invalid username or password or No Existing Account");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <h2 style={{ textAlign: "center", fontSize: "22px" }}>Admin Login</h2>
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
          If you are a new admin, register
          <Button
            variant="contained"
            style={{ margin: "20px auto", display: "block" }}
          >
            <Link
              to="/admin/signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              Admin Register
            </Link>
          </Button>
        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </Box>
    </div>
  );
};

export default AdminLogin;
