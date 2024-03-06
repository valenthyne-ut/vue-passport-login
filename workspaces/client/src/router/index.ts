import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import { routes } from "./Routes";

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
	setTitle(to);
});

export default router;
