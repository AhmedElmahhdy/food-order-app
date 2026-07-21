import {Router} from "express";
import {healthRoute} from "./app/health/health";
import {authRouter} from "./app/auth/routes";

export const routes = Router()

// use module routes here

routes.use("/health",healthRoute)
routes.use("/auth",authRouter)