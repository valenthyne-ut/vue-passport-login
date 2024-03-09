import { Router } from "express";
import { userRouter } from "./User";
import { authRouter } from "./Auth";

export const apiRouter = Router()
	.use("/user", userRouter)
	.use("/auth", authRouter);