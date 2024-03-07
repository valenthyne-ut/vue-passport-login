import { GenericAPI, HTTPMethods } from "..";

export class UserAPI extends GenericAPI {
	constructor() {
		super(GenericAPI.API_DEFAULT_ROOT_PATH + "/user");
	}

	async createUserAccount(username: string, password: string): Promise<void> {
		const requestData = JSON.stringify({
			username: username,
			password: password
		});

		return await this.performCall(this.rootPath, HTTPMethods.POST, { body: requestData }) as void;
	}
}