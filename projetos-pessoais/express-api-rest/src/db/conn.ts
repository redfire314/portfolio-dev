import mongoose from "mongoose";

export default async function (host: string, port: number, db: string) {
    return await mongoose.connect(`mongodb://${host}:${port}/${db}`);
}
