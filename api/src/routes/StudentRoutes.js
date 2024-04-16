import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", Course.index);
router.get("/:courseId", Course.get);
router.post("/", CourseFormRequest.validationPost, Course.store);
router.put("/:courseId", CourseFormRequest.validationPut, Course.update);
router.delete("/:courseId", CourseFormRequest.validationDelete, Course.destroy);

export default router;