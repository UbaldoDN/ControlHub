import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import CourseRoutes from "./routes/CourseRoutes.js";
import LessonRoutes from "./routes/LessonRoutes.js";
import QuestionRoutes from "./routes/QuestionRoutes.js";
import CourseFormRequests from "./app/http/requests/CourseFormRequests.js";
import LessonFormRequests from "./app/http/requests/LessonFormRequests.js";

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

app.use("/api/courses", CourseRoutes);
app.use("/api/courses/:courseId", CourseFormRequests.validId);
app.use("/api/courses/:courseId/lessons", LessonRoutes);
app.use("/api/courses/:courseId/lessons/:lessonId", LessonFormRequests.validId);
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