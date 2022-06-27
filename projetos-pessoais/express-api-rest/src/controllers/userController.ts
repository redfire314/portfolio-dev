import { Request, Response } from "express";
import bcrypt from "bcrypt";

import userModel from "../models/userModel";

export async function create(req: Request, res: Response) {
    const { username, password, email } = req.body;
    const isEmailBusy = await userModel
        .findOne({ email })
        .then((resolve) => {
            return resolve ? true : false;
        })
        .catch(() => new Error("Couldn't not resolve isEmailBusy"));

    if (isEmailBusy) {
        return res.sendStatus(409);
    }

    const hashedPwd = bcrypt.hashSync(password, bcrypt.genSaltSync());

    await new userModel({
        username,
        password: hashedPwd,
        email,
    }).save();

    res.status(201).json({ message: "User created with success" });
}
