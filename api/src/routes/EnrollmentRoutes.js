import express from "express";
import EnrollmentRequests from "../app/http/requests/EnrollmentRequests.js";
import EnrollmentControllers from "../app/http/controllers/EnrollmentControllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", EnrollmentControllers.index);
router.get("/:enrollmentId", EnrollmentControllers.get);
router.post("/", EnrollmentRequests.validationPost, EnrollmentControllers.store);
router.put("/:enrollmentId", EnrollmentRequests.validationPut, EnrollmentControllers.update);
router.delete("/:enrollmentId", EnrollmentRequests.validationDelete, EnrollmentControllers.destroy);

export default router;