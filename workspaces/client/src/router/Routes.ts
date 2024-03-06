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
	}
];