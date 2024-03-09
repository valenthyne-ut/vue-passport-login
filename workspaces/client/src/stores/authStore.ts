import { AuthAPI } from "@/classes/api/Auth";
import { User } from "@/classes/api/User/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
	const authenticated = ref<boolean>(false);
	const jwt = ref<string>("");
	const user = ref<User | null>(null);

	const authAPI = new AuthAPI();

	function authenticate(authJwt: string, authUser: User) {
		authenticated.value = true;
		jwt.value = authJwt;
		user.value = authUser;
	}

	async function clearAuthentication() {
		await authAPI.logout(jwt.value);
		authenticated.value = false;
		jwt.value = "";
		user.value = null;
		localStorage.removeItem("jwt");
	}

	return { authenticated, jwt, user, authenticate, clearAuthentication };
});