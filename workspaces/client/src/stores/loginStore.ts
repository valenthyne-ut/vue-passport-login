import { AuthAPI } from "@/classes/api/Auth";
import { UserAPI } from "@/classes/api/User";
import type { SuccessfulLoginResponse } from "@/types/api/Auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
	const username = ref<string>("");
	const password = ref<string>("");

	const userAPI = new UserAPI();
	const authAPI = new AuthAPI();

	async function attemptCreateAccount(): Promise<true> {
		if(!username.value) { throw new Error("Username is required."); }
		if(!password.value) { throw new Error("Password is required."); }
		
		await userAPI.createUserAccount(username.value, password.value);
		return true;
	}

	async function attemptLogin(): Promise<SuccessfulLoginResponse> {
		if(!username.value) { throw new Error("Username is required."); }
		if(!password.value) { throw new Error("Password is required."); }

		return await authAPI.login(username.value, password.value);
	}

	return { username, password, attemptCreateAccount, attemptLogin };
});