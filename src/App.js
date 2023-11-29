import React, { useContext } from "react";
import { UserContext } from "./components/context/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/SignUp";
import HomePage from "./components/home/HomePage";
import NavBar from "./components/common/NavBar";
import AllLockers from "./components/lockers/AllLockers";
import AvailableParcels from "./components/parcel/AvailableParcels";

function App() {
  const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-lockers/:id" element={<AllLockers />} />
        <Route path="/available-parcels" element={<AvailableParcels />} />
      </Routes>
    </Router>
  );
}

export default App;
