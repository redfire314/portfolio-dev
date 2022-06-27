import { JwtPayload } from "jsonwebtoken";

export interface IUserJwt extends JwtPayload {
    sub?: string;
}
