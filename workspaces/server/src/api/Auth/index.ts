import config from "@/config";
import { InvalidatedJWT } from "@/db/models/InvalidatedJWT";
import { User } from "@/db/models/User";
import { invalidatedJWTFilter } from "@/middleware/InvalidatedJWTFilter";
import { JWTPayload } from "@/types/api/Auth";
import { clientErrorResponse, serverErrorResponse } from "@/util/api";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";

export const authRouter = Router()
	.post("/", (request, response, next) => {
		passport.authenticate("password", { session: false }, (error: Error | null, user: User) => {
			if(error) { return clientErrorResponse(response, error.message); }

			request.login(user, { session: false }, async (error) => {
				if(error) { 
					console.log((error as Error).message || error as string);
					return serverErrorResponse(response, "Something went wrong while logging you in.");
				}
				
				const payload: JWTPayload = {
					user: {
						name: user.username
					},
					exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
				};

				const jwt = sign(payload, config.JWT_SECRET);
				return response.status(200).json({
					jwt: jwt,
					user: payload.user
				});
			});
		})(request, response, next);
	})
	.delete("/", invalidatedJWTFilter, async (request, response) => {
		try {
			const authHeader = request.headers.authorization;
			
			if(authHeader && authHeader.startsWith("Bearer ")) {
				const jwt = authHeader.substring(7, authHeader.length);
				await InvalidatedJWT.create({ jwt: jwt });

				return response.status(200).json({});
			} else {
				return clientErrorResponse(response, "Not logged in.");
			}
		} catch(error) {
			console.log((error as Error).message || error as string);
			return serverErrorResponse(response, "Something went wrong while logging you out.");
		}
	});