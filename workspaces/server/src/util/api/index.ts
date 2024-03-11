import { RequestParameterTypes } from "@/types/api/api";
import { Response } from "express";

export function validateRequestParameter(value: unknown, type: RequestParameterTypes): boolean {
	return (value != undefined && typeof value === type);
}

export function invalidRequestParameterResponse(response: Response, name: string, type: string) {
	return response.status(400).json({
		error: `${name} parameter either is undefined or isn't of type ${type}.`
	});
}

export function clientErrorResponse(response: Response, error: string) {
	return response.status(400).json({
		error: error
	});
}

export function serverErrorResponse(response: Response, error: string) {
	return response.status(500).json({
		error: error
	});
}