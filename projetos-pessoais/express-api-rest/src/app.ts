import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

app.use("/api", routes);

export default app;
