import type { SuccessfulLoginResponse } from "@/types/api/Auth";
import { GenericAPI, HTTPMethods } from "..";

export class AuthAPI extends GenericAPI {
	constructor() {
		super(GenericAPI.API_DEFAULT_ROOT_PATH + "/auth");
	}

	async login(username: string, password: string): Promise<SuccessfulLoginResponse> {
		const requestData = JSON.stringify({
			username: username,
			password: password
		});

		return await this.performCall(this.rootPath, HTTPMethods.POST, { body: requestData }) as SuccessfulLoginResponse;
	}
}