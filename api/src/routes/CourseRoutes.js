import express from "express";
import CourseRequests from "../app/http/requests/CourseRequests.js";
import CourseControllers from "../app/http/controllers/CourseControllers.js";
import CheckUserRole from "../app/http/middleware/CheckUserRoleMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", CourseControllers.index);
router.get("/:courseId", CourseRequests.validateGet, CourseControllers.get);
router.post("/", await CheckUserRole("teacher"), CourseRequests.validatePost, CourseControllers.store);
router.put("/:courseId", await CheckUserRole("teacher"), CourseRequests.validatePut, CourseControllers.update);
router.put("/:courseId/approved", await CheckUserRole("teacher"), CourseRequests.validatePutApproved, CourseControllers.updateApproved);
router.put("/:courseId/available", await CheckUserRole("teacher"), CourseRequests.validatePutAvailable, CourseControllers.updateAvailable);
router.delete("/:courseId", await CheckUserRole("teacher"), CourseRequests.validateDelete, CourseControllers.destroy);

export default router;