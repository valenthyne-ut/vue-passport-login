import { User } from "@/classes/api/User/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStateStore = defineStore("authState", () => {
	const authenticated = ref<boolean>(false);
	const jwt = ref<string>("");
	const user = ref<User | null>(null);

	return { authenticated, jwt, user };
});