import { useAuthStore } from "@/stores/authStore";
import RootView from "@/views/RootView.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: readonly RouteRecordRaw[] = [
	{
		path: "/",
		name: "root",
		meta: {
			title: "Home",
		},
		beforeEnter: async () => {
			const authStore = useAuthStore();
			if(!authStore.authenticated) { return { name: "login" }; }
		},
		component: RootView
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "Login"
		},
		beforeEnter: () => {
			const authStore = useAuthStore();
			if(authStore.authenticated) { return { name: "root" }; }
		},
		component: () => import("@/views/LoginView.vue")
	}
];