import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", Question.index);
router.get("/:questionId", Question.get);
router.post("/", QuestionFormRequest.validationPost, Question.store);
router.put("/:questionId", QuestionFormRequest.validationPut, Question.update);
router.delete("/:questionId", QuestionFormRequest.validationDelete, Question.destroy);

export default router;