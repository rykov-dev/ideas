import express from "express";
import { ideaRouter } from "./idea";
import { finalErrorHandler, gracefulShutdown } from "./utils";
import requestIp from "request-ip";

const { HOST: host = "127.0.0.1", PORT: port = 3000 } = process.env;
const app = express();

app
.use(requestIp.mw())
.use("/idea", ideaRouter)
.use(finalErrorHandler);

const server = app.listen(port as number, host, () => {
   console.info(`Server started on: ${host}:${port}`);
});

process.on('SIGTERM', () => gracefulShutdown(server, 'SIGTERM'));
process.on('SIGINT', () => gracefulShutdown(server, 'SIGINT'));