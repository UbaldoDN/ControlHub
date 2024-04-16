import express from "express";
import QuestionRequests from "../app/http/requests/QuestionRequests.js";
import QuestionControllers from "../app/http/controllers/QuestionControllers.js";
import CheckUserRole from "../app/http/middleware/CheckUserRoleMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", await CheckUserRole("teacher"), QuestionControllers.index);
router.get("/:questionId", await CheckUserRole("teacher"), QuestionRequests.validateGet, QuestionControllers.get);
router.post("/", await CheckUserRole("teacher"), QuestionRequests.validatePost, QuestionControllers.store);
router.put("/:questionId", await CheckUserRole("teacher"), QuestionRequests.validatePut, QuestionControllers.update);
router.delete("/:questionId", await CheckUserRole("teacher"), QuestionRequests.validateDelete, QuestionControllers.destroy);

export default router;