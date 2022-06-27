import app from "./app";
import conn from "./db/conn";

const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = parseInt(process.env.MONGO_PORT as string) || 27017;
const MONGO_DB = process.env.MONGO_DB || "todo-api";

// Only starts the server if connection with database was successfully
conn(MONGO_HOST, MONGO_PORT, MONGO_DB)
    .then(() => {
        app.listen(APP_PORT, () => {
            console.log(`Server running on port ${APP_PORT}`);
        });
    })
    .catch((error: any) => {
        console.error(error.message);
    });
