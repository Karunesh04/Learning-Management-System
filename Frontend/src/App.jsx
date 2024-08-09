import "./App.css";

import { Route, Routes } from "react-router-dom";

import AboutUS from "./pages/AboutUs";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUS />} />
    </Routes>
  );
}

export default App;
