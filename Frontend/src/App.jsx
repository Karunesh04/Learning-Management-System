import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./components/Auth/RequireAuth";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import CourseDescription from "./pages/Course/CourseDescription";
import CourseList from "./pages/Course/CourseList";
import CreateCourse from "./pages/Course/CreateCourse";
import Denied from "./pages/Denied";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/User/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/course/description" element={<CourseDescription />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
        <Route path="/user/profile" element={<Profile />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
      </Route>

      <Route path="/contact" element={<Contact />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
