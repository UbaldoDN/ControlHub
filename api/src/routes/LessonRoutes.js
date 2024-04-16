import express from "express";
import LessonRequests from "../app/http/requests/LessonRequests.js";
import LessonControllers from "../app/http/controllers/LessonControllers.js";
import CheckUserRole from "../app/http/middleware/CheckUserRoleMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", LessonControllers.index);
router.get("/:lessonId", LessonRequests.validateGet, LessonControllers.get);
router.post("/", await CheckUserRole("teacher"), LessonRequests.validatePost, LessonControllers.store);
router.put("/:lessonId", await CheckUserRole("teacher"), LessonRequests.validatePut, LessonControllers.update);
router.put("/:lessonId/available", await CheckUserRole("teacher"), LessonRequests.validatePutAvailable, LessonControllers.updateAvailable);
router.delete("/:lessonId", await CheckUserRole("teacher"), LessonRequests.validateDelete, LessonControllers.destroy);

export default router;