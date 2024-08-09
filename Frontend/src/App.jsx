import "./App.css";

import { Route, Routes } from "react-router-dom";

import AboutUS from "./pages/AboutUs";
import Home from "./pages/Home";
import NotFound  from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUS />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
