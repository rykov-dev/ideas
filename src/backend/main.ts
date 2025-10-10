import express from "express";
import { ideaRouter } from "./idea";
import { finalErrorHandler, gracefulShutdown } from "./utils";
import requestIp from "request-ip";
import cors from "cors";
import config from "config";


const { PORT: port = 3000 } = process.env;
const app = express();
const corsObject = config.get("cors");

app
.set("trust proxy", true)
.use(cors(corsObject))
.use(requestIp.mw())
.use("/idea", ideaRouter)
.use(finalErrorHandler);

const server = app.listen(port as number, () => {
   console.info(`Server started.`);
});

process.on("SIGTERM", () => gracefulShutdown(server, "SIGTERM"));
process.on("SIGINT", () => gracefulShutdown(server, "SIGINT"));