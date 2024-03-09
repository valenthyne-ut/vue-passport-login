import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import { routes } from "./Routes";
import { useAuthStore } from "@/stores/authStore";

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

router.beforeEach((to, from) => {
	const authStore = useAuthStore();

	if(to.name == "root" && !authStore.authenticated) {
		return { name: "login" };
	} else if(to.name == "login" && authStore.authenticated) {
		return { name: "root" };
	}

	setTitle(to);
});

export default router;
