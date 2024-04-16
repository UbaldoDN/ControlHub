import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";
import CourseRoutes from "./routes/CourseRoutes.js";
import LessonRoutes from "./routes/LessonRoutes.js";
import QuestionRoutes from "./routes/QuestionRoutes.js";
import CourseRequests from "./app/http/requests/CourseRequests.js";
import LessonRequests from "./app/http/requests/LessonRequests.js";

// Create the express app and  import the type of app from express;
const app = express();

// Cors
app.use(cors());

//configure env;
dotenv.config();

// Parser
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

app.use("/api/users", UserRoutes);
app.use("/api/students", StudenRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/courses/:courseId", CourseRequests.validId);
app.use("/api/courses/:courseId/lessons", LessonRoutes);
app.use("/api/courses/:courseId/lessons/:lessonId", LessonRequests.validId);
app.use("/api/courses/:courseId/lessons/:lessonId/questions", QuestionRoutes);

// Listen the server
app.listen(PORT, async () => {
    console.log(`🗄️ Server on http:localhost:${PORT}`);

    // Connect To The Database
    try {
        await mongoose.connect(
            process.env.DATABASE_URL
        );
        
        console.log("🛢️ Connected To Database");
    } catch (error) {
        console.log("⚠️ Error to connect Database");
    }
});