import express from "express";
import LessonRequests from "../app/http/requests/LessonRequests.js";
import LessonControllers from "../app/http/controllers/LessonControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", LessonControllers.index);
router.get("/:lessonId", LessonRequests.validateGet, LessonControllers.get);
router.post("/", LessonRequests.validatePost, LessonControllers.store);
router.put("/:lessonId", LessonRequests.validatePut, LessonControllers.update);
router.put("/:lessonId/available", LessonRequests.validatePutAvailable, LessonControllers.updateAvailable);
router.delete("/:lessonId", LessonRequests.validateDelete, LessonControllers.destroy);

export default router;