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
import DriverProfile from "./components/profile/DriverProfile";
import TaskList from "./components/tasks/TaskList";

function App() {
  const { user, isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <NavBar
        user={user}
        isAuthenticated={isAuthenticated}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login /> : <HomePage />} />
        {isAuthenticated && <Route path="/home" element={<HomePage />} />}
        <Route
          path="/signin"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        {isAuthenticated && (
          <Route path="/all-lockers/:city" element={<AllLockers />} />
        )}
        {isAuthenticated && (
          <Route path="/tasklist" element={<TaskList />} />
        )}
        {isAuthenticated && (
          <Route path="/profile" element={<DriverProfile />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
