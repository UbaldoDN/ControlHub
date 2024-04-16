import express from "express";
import CourseRequests from "../app/http/requests/CourseRequests.js";
import CourseControllers from "../app/http/controllers/CourseControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", CourseControllers.index);
router.get("/:courseId", CourseRequests.validateGet, CourseControllers.get);
router.post("/", CourseRequests.validatePost, CourseControllers.store);
router.put("/:courseId", CourseRequests.validatePut, CourseControllers.update);
router.put("/:courseId/approved", CourseRequests.validatePutApproved, CourseControllers.updateApproved);
router.put("/:courseId/available", CourseRequests.validatePutAvailable, CourseControllers.updateAvailable);
router.delete("/:courseId", CourseRequests.validateDelete, CourseControllers.destroy);

export default router;