import express from "express";
import UserRequests from "../app/http/requests/UserRequests.js";
import UserControllers from "../app/http/controllers/UserControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", UserControllers.index);
router.get("/:userId", UserRequests.validateGet, UserControllers.get);
router.post("/", UserRequests.validatePost, UserControllers.store);
router.put("/:userId", UserRequests.validatePut, UserControllers.update);
router.delete("/:userId", UserRequests.validateDelete, UserControllers.destroy);
router.post("/generateData", UserControllers.generateData);

export default router;