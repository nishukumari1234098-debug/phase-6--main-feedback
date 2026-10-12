import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        studentName:{
            type: String,
            required: true,
            trim: true
        },
        rating:{
            type: Number,
            required: true,
            min: [1, "Start rating from 1"],
            max: [5, "Highest should be 5"]
        },
        comment:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Feedback = mongoose.model("Feedback", feedbackSchema)

export default Feedback