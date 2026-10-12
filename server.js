import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import Feedback from "./models/feedbackModel.js"

dotenv.config()
// Database connection is awaited before starting the server.

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.post("/feedbacks", async (req, res)=>{
    try{
        const {studentName, rating, comment} = req.body

        const studentFeedback = new Feedback({
            studentName,
            rating,
            comment
        })

        await studentFeedback.save()

        res.status(201).json({
            success: true,
            data: studentFeedback
        })

    } catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

app.get("/feedbacks", async (req, res)=>{
    try{
        const getFeedback = await Feedback.find()

        res.status(200).json({
            success: true,
            count: getFeedback.length,
            data: getFeedback
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const PORT = process.env.PORT || 5000

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`main-feedback server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
