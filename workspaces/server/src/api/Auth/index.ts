import config from "@/config";
import { User } from "@/db/models/User";
import { JWTPayload } from "@/types/api/Auth";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";

export const authRouter = Router()
	.post("/", (request, response, next) => {
		passport.authenticate("password", { session: false }, (error: Error | null, user: User) => {
			if(error) { return response.status(400).json({ error: error.message }); }

			request.login(user, { session: false }, async (error) => {
				if(error) { 
					console.log((error as Error).message || error as string);
					return response.status(500).json({ error: "Something went wrong while logging you in." });
				}

				const payload: JWTPayload = {
					user: {
						name: user.username
					}
				};

				const jwt = sign(payload, config.JWT_SECRET);
				return response.status(200).json({
					jwt: jwt,
					user: payload.user
				});
			});
		})(request, response, next);
	});