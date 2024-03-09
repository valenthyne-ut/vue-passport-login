import { User } from "@/classes/api/User/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
	const authenticated = ref<boolean>(false);
	const jwt = ref<string>("");
	const user = ref<User | null>(null);

	function authenticate(authJwt: string, authUser: User) {
		authenticated.value = true;
		jwt.value = authJwt;
		user.value = authUser;
	}

	return { authenticated, jwt, user, authenticate };
});