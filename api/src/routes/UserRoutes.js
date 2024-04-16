import express from "express";
import UserRequests from "../app/http/requests/UserRequests.js";
import UserControllers from "../app/http/controllers/UserControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", UserControllers.index);
router.get("/:userId", UserControllers.get);
router.post("/", UserRequests.validationPost, UserControllers.store);
router.put("/:UserControllerId", UserRequests.validationPut, UserControllers.update);
router.delete("/:UserControllerId", UserRequests.validationDelete, UserControllers.destroy);

export default router;