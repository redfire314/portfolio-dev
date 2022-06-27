import { Request, Response, NextFunction } from "express";
import joi from "joi";

export async function createUserValidator(req: Request, res: Response, next: NextFunction) {
    const bodySchema = joi.object({
        username: joi.string().min(4).max(64).required(),
        password: joi
            .string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/)
            .required(),
        email: joi.string().email().required(),
    });

    try {
        await bodySchema.validateAsync(req.body);
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}
