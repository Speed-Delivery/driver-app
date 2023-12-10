import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import NavBar from "./components/common/NavBar";
import AllLockers from "./components/lockers/AllLockers";
import TaskList from "./components/tasks/TaskList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/all-lockers/:city" element={<AllLockers />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
