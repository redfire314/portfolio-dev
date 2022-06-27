import { Request, Response } from "express";

import taskModel from "../models/taskModel";

export async function create(req: Request, res: Response) {
    const { title, description } = req.body;
    const owner = req.decodedToken?.sub as string;

    await new taskModel({
        title,
        description,
        owner,
    }).save();

    res.status(201).json({ message: "Task created with success" });
}

export async function getAllTasks(req: Request, res: Response) {
    const owner = req.decodedToken?.sub as string;
    const tasks = await taskModel.find({ owner });

    res.status(200).json({ tasks });
}

export async function getTaskById(req: Request, res: Response) {
    const taskId = req.params.id;
    const owner = req.decodedToken?.sub as string;
    const task = await taskModel.findOne({ _id: taskId, owner });

    if (!task) {
        return res.sendStatus(204);
    }

    res.status(200).json({ task });
}

export async function update(req: Request, res: Response) {
    const { id, title, description } = req.body;
    const owner = req.decodedToken?.sub as string;
    const task = await taskModel.findOne({ _id: id, owner });

    if (!task) {
        return res.sendStatus(204);
    }

    await taskModel.updateOne(
        { _id: id, owner },
        {
            title,
            description,
        }
    );

    res.status(200).json({ message: "Task updated successfully" });
}

export async function remove(req: Request, res: Response) {
    const { id } = req.body;
    const owner = req.decodedToken?.sub as string;
    const task = await taskModel.findOne({ _id: id, owner });

    if (!task) {
        return res.sendStatus(204);
    }

    await taskModel.deleteOne({ _id: id, owner });

    res.status(200).json({ message: "Task removed successfully" });
}

export async function toggleStatus(req: Request, res: Response) {
    const { id, status } = req.body;
    const owner = req.decodedToken?.sub as string;
    const task = await taskModel.findOne({ _id: id, owner });

    if (!task) {
        return res.sendStatus(204);
    }

    await taskModel.updateOne({ _id: id, owner }, { isCompleted: status });

    res.status(200).json({ message: "Task status updated successfully" });
}
