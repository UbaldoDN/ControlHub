import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", Lesson.index);
router.get("/:lessonId", Lesson.get);
router.post("/", LessonFormRequest.validationPost, Lesson.store);
router.put("/:lessonId", LessonFormRequest.validationPut, Lesson.update);
router.delete("/:lessonId", LessonFormRequest.validationDelete, Lesson.destroy);

export default router;