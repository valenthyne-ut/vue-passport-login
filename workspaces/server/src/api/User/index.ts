import { Request, Router } from "express";
import { userCreationParameterFilter } from "./filters";
import { UserCreationParameters } from "@/types/api/User";
import { serverErrorResponse } from "@/util/api";
import { User } from "@/db/models/User";
import { hashSync } from "bcrypt";
import config from "@/config";

export const userRouter = Router()
	.post("/", userCreationParameterFilter, async (request: Request<unknown, unknown, UserCreationParameters>, response) => {
		try {
			const { username, password } = request.body;

			const userExists = await User.findOne({ where: { username: username } }) != null;
			if(userExists) { return response.status(400).json({ error: "A user with the provided name already exists." }); }

			await User.create({
				username: username,
				password: hashSync(password, config.BCRYPT_HASH_COST)
			});

			return response.status(201).json({});
		} catch(error) {
			console.log(error);
			return serverErrorResponse(response, "Something went wrong while creating your user.");
		}
	});