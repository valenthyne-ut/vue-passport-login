import { Router } from "express";
import { userRouter } from "./User";

export const apiRouter = Router()
	.use("/user", userRouter);