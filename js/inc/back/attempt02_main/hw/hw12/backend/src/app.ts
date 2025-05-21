import express from "express";
import { setApp } from "./set-app";

export const app: express.Express = express();
setApp(app);
