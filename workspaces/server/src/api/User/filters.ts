import { DirtyUserCreationParameters } from "@/types/api/User";
import { invalidRequestParameterResponse, validateRequestParameter } from "@/util/api";
import { RequestHandler } from "express";

export const userCreationParameterFilter: RequestHandler<unknown, unknown, DirtyUserCreationParameters> = (request, response, next) => {
	const { username, password } = request.body;
	if(!validateRequestParameter(username, "string")) { return invalidRequestParameterResponse(response, "username", "string"); }
	if(!validateRequestParameter(password, "string")) { return invalidRequestParameterResponse(response, "password", "string"); }
	next();
};