import { Request, Response, NextFunction } from "express";
import joi from "joi";

export async function createTaskValidator(req: Request, res: Response, next: NextFunction) {
    const bodySchema = joi.object({
        title: joi.string().min(2).max(128).required(),
        description: joi.string().min(2).max(1024).required(),
    });

    try {
        await bodySchema.validateAsync(req.body);
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function updateTaskValidator(req: Request, res: Response, next: NextFunction) {
    const bodySchema = joi.object({
        id: joi.string().length(36).required(), // UUID 4 length
        title: joi.string().min(2).max(128),
        description: joi.string().min(2).max(1024),
    });

    try {
        await bodySchema.validateAsync(req.body);
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function removeTaskValidator(req: Request, res: Response, next: NextFunction) {
    const bodySchema = joi.object({
        id: joi.string().length(36).required(), // UUID 4 length
    });

    try {
        await bodySchema.validateAsync(req.body);
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function toggleStatusTaskValidator(req: Request, res: Response, next: NextFunction) {
    const bodySchema = joi.object({
        id: joi.string().length(36).required(), // UUID 4 length
        status: joi.boolean().required(),
    });

    try {
        await bodySchema.validateAsync(req.body);
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}
