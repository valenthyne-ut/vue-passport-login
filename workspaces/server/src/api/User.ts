import { Router } from "express";

export const userRouter = Router()
	.post("/", async (request, response) => {
		return response.status(501).json({ error: "Not implemented." });
	});