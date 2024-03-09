import { UserAPI } from "@/classes/api/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
	const username = ref<string>("");
	const password = ref<string>("");

	const userAPI = new UserAPI();

	async function attemptCreateAccount(): Promise<true> {
		if(!username.value) { throw new Error("Username is required."); }
		if(!password.value) { throw new Error("Password is required."); }
		
		await userAPI.createUserAccount(username.value, password.value);
		return true;
	}

	return { username, password, attemptCreateAccount };
});