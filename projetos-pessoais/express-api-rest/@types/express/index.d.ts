import { IUserJwt } from "../../src/interfaces/IJwt";

declare global {
    namespace Express {
        interface Request {
            decodedToken?: IUserJwt;
        }
    }
}
