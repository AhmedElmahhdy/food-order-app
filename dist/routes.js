import { Router } from "express";
import { healthRoute } from "./app/health.js";
export const routes = Router();
// use module routes here
routes.use("/health", healthRoute);
