import express from "express";
import StudentRequests from "../app/http/requests/StudentRequests.js";
import StudentControllers from "../app/http/controllers/StudentControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/:studentId/courses", StudentRequests.validateList, StudentControllers.getAllCourses);
router.get("/:studentId/courses/:courseId", StudentRequests.validateGet, StudentControllers.getCourse);
router.get("/:studentId/enrolls", StudentRequests.validateList, StudentControllers.getEnrolls);
router.post("/:studentId/courses/:courseId/enroll", StudentRequests.validateEnrollment, StudentControllers.enroll);
router.post("/:studentId/courses/:courseId/unenroll", StudentRequests.validateUnEnrollment, StudentControllers.unenroll);

export default router;