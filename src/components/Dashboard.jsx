import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://emp-fhhr.onrender.com/employees/employees")
      .then((res) => {
        setDataset(res.data);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (id) => {
    console.log("Updating blog with ID:", id);
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://emp-fhhr.onrender.com/admin/employees/${id}`);
      setDataset(dataset.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  };

  return (
    <div
      className="containerf"
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" size={80} thickness={5} />
        </div>
      ) : (
        <div>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead style={{ backgroundColor: "#333" }}>
                <TableRow>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Location
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Salary
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataset.map((row, index) => (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#444" : "#333",
                    }}
                  >
                    <TableCell
                      style={{ color: "white", fontSize: "16px" }}
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontSize: "16px" }}
                      align="center"
                    >
                      {row.designation}
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontSize: "16px" }}
                      align="center"
                    >
                      {row.location}
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontSize: "16px" }}
                      align="center"
                    >
                      {row.salary}
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontSize: "16px" }}
                      align="center"
                    >
                      <button
                        style={{
                          backgroundColor: "#7fcf0e",
                          color: "white",
                          border: "none",
                          padding: "6px 14px",
                          cursor: "pointer",
                          borderRadius: "6px",
                          fontSize: "15px",
                        }}
                        onClick={() => handleUpdate(row._id)}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontSize: "16px" }}
                      align="center"
                    >
                      <button
                        style={{
                          backgroundColor: "#33cf1e",
                          color: "white",
                          border: "none",
                          padding: "6px 14px",
                          cursor: "pointer",
                          borderRadius: "6px",
                          fontSize: "15px",
                        }}
                        onClick={() => handleDelete(row._id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
