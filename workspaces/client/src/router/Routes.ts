import RootView from "@/views/RootView.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: readonly RouteRecordRaw[] = [
	{
		path: "/",
		name: "root",
		meta: {
			title: "Home",
		},
		component: RootView
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "Login"
		},
		component: () => import("@/views/LoginView.vue")
	},
	{
		path: "/login/create-account",
		name: "create-account",
		meta: {
			title: "Create Account"
		},
		component: () => import("@/views/CreateAccountView.vue")
	}
];