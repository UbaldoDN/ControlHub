import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import CheckUserRole from "./app/http/middleware/CheckUserRoleMiddleware.js";
import CourseRequests from "./app/http/requests/CourseRequests.js";
import UserRoutes from "./routes/UserRoutes.js";
import CourseRoutes from "./routes/CourseRoutes.js";
import LessonRoutes from "./routes/LessonRoutes.js";
import LessonRequests from "./app/http/requests/LessonRequests.js";
import QuestionRoutes from "./routes/QuestionRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT || 9000;

app.get("/health", async (request, response) => {
    response.send({ message: "Health OK!"});
});

app.use("/api/users", await CheckUserRole('admin'), UserRoutes);
app.use("/api/courses", await CheckUserRole('teacher'), CourseRoutes);
app.use("/api/courses/:courseId", await CheckUserRole('teacher'), CourseRequests.validateCourseId);
app.use("/api/courses/:courseId/lessons", await CheckUserRole('teacher'), LessonRoutes);
app.use("/api/courses/:courseId/lessons/:lessonId", await CheckUserRole('teacher'), LessonRequests.validateLessonId);
app.use("/api/courses/:courseId/lessons/:lessonId/questions", await CheckUserRole('teacher'), QuestionRoutes);

app.use("/api/students", await CheckUserRole('student'), StudentRoutes);

app.listen(PORT, async () => {
    console.log(`🗄️ Server on http:localhost:${PORT}`);
    try {
        await mongoose.connect(
            process.env.DATABASE_URL
        );
        
        console.log("🛢️ Connected To Database");
    } catch (error) {
        console.log("⚠️ Error to connect Database");
    }
});