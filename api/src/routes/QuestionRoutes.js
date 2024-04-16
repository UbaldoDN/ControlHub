import express from "express";
import QuestionRequests from "../app/http/requests/QuestionRequests.js";
import QuestionControllers from "../app/http/controllers/QuestionControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", QuestionControllers.index);
router.get("/:questionId", QuestionRequests.validateGet, QuestionControllers.get);
router.post("/", QuestionRequests.validatePost, QuestionControllers.store);
router.put("/:questionId", QuestionRequests.validatePut, QuestionControllers.update);
router.delete("/:questionId", QuestionRequests.validateDelete, QuestionControllers.destroy);

export default router;