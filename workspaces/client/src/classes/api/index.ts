export enum HTTPMethods {
	GET = "GET",
	HEAD = "HEAD",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	CONNECT = "CONNECT",
	OPTIONS = "OPTIONS",
	TRACE = "TRACE",
	PATCH = "PATCH"
}

interface APICallOptionalParams {
	headers?: HeadersInit;
	body?: BodyInit;
	contentType?: string;
}

export interface APIErrorResponse {
	error?: string;
}

export abstract class GenericAPI {
	rootPath: string;
	static API_DEFAULT_ROOT_PATH: string = "/api";

	constructor(rootPath: string) {
		this.rootPath = rootPath;
	}

	protected async performCall(path: string, method: HTTPMethods, params?: APICallOptionalParams): Promise<unknown> {
		const requestOptions: RequestInit = {
			method: method,
			headers: params?.headers || {
				"Content-Type": params?.contentType || "application/json"
			},
			body: params?.body
		};
		
		const response = await fetch(path, requestOptions);

		if(response.ok) {
			return await response.json();
		} else {
			let error: Error;

			const responseLengthHeader = response.headers.get("Content-Length");
			const responseHasContent = (responseLengthHeader != null && parseInt(responseLengthHeader) > 2);

			if(responseHasContent) {
				try {
					const responseJSON = await response.json() as APIErrorResponse;
					if(responseJSON.error != undefined)  {
						error = new Error(responseJSON.error);
					} else {
						error = new Error("API did not provide an error message.");
					}
				} catch(_) {
					error = new Error("API response is unparseable.");
				}
			} else {
				error = new Error("API returned an empty response.");
			}

			throw error;
		}
	}
}