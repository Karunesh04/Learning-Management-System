import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  getLecturesByCourseId,
  updateCourse,
  deleteCourse,
  addLectureToCourseId,
} from "../controllers/course.controller.js";
import {
  isLoggedIn,
  authorizeRoles,
  authorizedSubscriber,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );

router
  .route("/:courseId")
  .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorizeRoles("ADMIN"), updateCourse)
  .delete(isLoggedIn, authorizeRoles("ADMIN"), deleteCourse)
  .post(isLoggedIn, authorizeRoles("ADMIN"), addLectureToCourseId);

export default router;
