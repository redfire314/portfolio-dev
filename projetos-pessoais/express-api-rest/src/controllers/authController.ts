import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.sendStatus(204);
    }

    const isValidHash = bcrypt.compareSync(password, user.password);

    if (!isValidHash) {
        return res.sendStatus(204);
    }

    const accessToken = jwt.sign(
        {
            sub: user._id,
        },
        process.env.PRIVATE_KEY as string,
        {
            expiresIn: "1h",
        }
    );

    res.status(200).json({ accessToken });
}
