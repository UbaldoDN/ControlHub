/* import express from "express";
import QuestionRequests from "../app/http/requests/QuestionRequests.js";
import QuestionControllers from "../app/http/controllers/QuestionControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", QuestionControllers.index);
router.get("/:questionId", QuestionControllers.get);
router.post("/", QuestionRequests.validationPost, QuestionControllers.store);
router.put("/:questionId", QuestionRequests.validationPut, QuestionControllers.update);
router.delete("/:questionId", QuestionRequests.validationDelete, QuestionControllers.destroy);

export default router; */