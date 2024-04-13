import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Empform from "./components/EmpForm";
import Login from "./components/Login";
import Mains from "./components/Main";
import Signup from "./components/Signup";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import UpdateEmp from "./components/UpdateEmp";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/admin/login"} element={<AdminLogin />}></Route>
        <Route path={"/admin/signup"} element={<AdminSignup />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>

        <Route path="/empapp" element={<Mains child={<Dashboard />} />} />
        <Route path="/home" element={<Mains child={<Home />} />} />
        <Route path="/form" element={<Mains child={<Empform />} />} />
        <Route path="/form/:id" element={<Mains child={<Empform />} />} />
        <Route path="/update" element={<Mains child={<UpdateEmp />} />} />
        <Route path="/update/:id" element={<Mains child={<UpdateEmp />} />} />
      </Routes>
    </div>
  );
}

export default App;
