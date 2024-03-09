import { InvalidatedJWT } from "@/db/models/InvalidatedJWT";
import { RequestHandler } from "express";

export const invalidatedJWTFilter: RequestHandler = async (request, response, next) => {
	const authHeader = request.headers.authorization;

	if(!authHeader || !authHeader.startsWith("Bearer ")) { return next(); }

	const jwt = authHeader.substring(7, authHeader.length);
	const cacheJwt = await InvalidatedJWT.findOne({ where: { jwt: jwt } });
	if(cacheJwt) { return response.status(401).json({ error: "Unauthorized." }); }

	next();
};