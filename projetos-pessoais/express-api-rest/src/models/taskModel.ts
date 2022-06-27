import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const taskSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4(),
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: String,
            ref: "Users",
            required: true,
        },
    },
    { timestamps: true }
);

const taskModel = mongoose.model("Tasks", taskSchema);

export default taskModel;
