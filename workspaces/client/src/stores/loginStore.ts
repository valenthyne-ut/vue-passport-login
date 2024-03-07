import { UserAPI } from "@/classes/api/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
	const status = ref<{ type: string, text: string }>({ type: "none", text: "" });

	const username = ref<string>("");
	const password = ref<string>("");

	const userAPI = new UserAPI();

	function resetStatus() {
		setStatus("none", "");
	}

	function setStatus(type: string, text: string) {
		status.value.type = type;
		status.value.text = text;
	}

	async function createAccount() {
		resetStatus();
		if(!username.value) { return setStatus("error", "Username is required."); }
		if(!password.value) { return setStatus("error", "Password is required."); }
		
		try {
			await userAPI.createUserAccount(username.value, password.value);
			setStatus("success", "Account successfully created.");
		} catch(error) {
			setStatus("error", (error as Error).message || error as string);
		}
	}

	return { status, username, password, resetStatus, setStatus, createAccount };
});