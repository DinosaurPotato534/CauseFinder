import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Landing";
import Search from "./pages/Search";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Search" Component={Search} />
      </Routes>
    </Router>
  );
};

export default App;
