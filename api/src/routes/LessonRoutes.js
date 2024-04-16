import express from "express";
import LessonRequests from "../app/http/requests/LessonRequests.js";
import LessonControllers from "../app/http/controllers/LessonControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", LessonControllers.index);
router.get("/:lessonId", LessonControllers.get);
router.post("/", LessonRequests.validationPost, LessonControllers.store);
router.put("/:lessonId", LessonRequests.validationPut, LessonControllers.update);
router.delete("/:lessonId", LessonRequests.validationDelete, LessonControllers.destroy);

export default router;