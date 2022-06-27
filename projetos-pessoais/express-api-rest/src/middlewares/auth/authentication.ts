import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { IUserJwt } from "../../interfaces/IJwt";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        return res.sendStatus(401);
    }

    const [, accessToken] = bearerToken.split(" ");

    try {
        const decoded = jwt.verify(accessToken, process.env.PRIVATE_KEY as string);
        req.decodedToken = decoded as IUserJwt;
        next();
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
}
