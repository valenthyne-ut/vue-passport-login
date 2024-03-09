import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import { routes } from "./Routes";
import { useAuthStore } from "@/stores/authStore";
import { UserAPI } from "@/classes/api/User";

const DEFAULT_ROUTE_TITLE = "vue-passport-login";

function setTitle(to: RouteLocationNormalized) {
	document.title = typeof (to.meta.title as string | undefined) !== "undefined" ? 
		to.meta.title as string : 
		DEFAULT_ROUTE_TITLE;
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes
});

router.beforeEach(async (to, from) => {
	const authStore = useAuthStore();

	if(!from.name && !authStore.authenticated) {
		const jwt = localStorage.getItem("jwt");
		if(jwt) {
			localStorage.removeItem("jwt");
			try {
				const user = (await new UserAPI().getUserDetails(jwt)).user;
				authStore.authenticate(jwt, user);
			} catch(error) {
				console.log(error);
			}
		}
	}

	setTitle(to);
});

export default router;
