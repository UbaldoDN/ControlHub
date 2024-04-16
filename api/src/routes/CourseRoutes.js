import express from "express";
import CourseRequests from "../app/http/requests/CourseRequests.js";
import CourseControllers from "../app/http/controllers/CourseControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", CourseControllers.index);
router.get("/:courseId", CourseControllers.get);
router.post("/", CourseRequests.validationPost, CourseControllers.store);
router.put("/:courseId", CourseRequests.validationPut, CourseControllers.update);
router.delete("/:courseId", CourseRequests.validationDelete, CourseControllers.destroy);

export default router;