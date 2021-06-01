// Dependencies
import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

// Assets
import hola from "./routes/hola";

const APP: Koa = new Koa();
const PORT: string | number = process.env.PUERTO || 3000;

// Middlewares
APP.use(bodyParser());
APP.use(cors({ origin: "*" }));
APP.use(logger());
APP.use(hola.routes());

// Creacion del servidor
const SERVER = APP.listen(PORT, async () =>
  console.log(`Server listening on port ${PORT}`)
).on("error", (err) => console.log(err));

module.exports = SERVER;
