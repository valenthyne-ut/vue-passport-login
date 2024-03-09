<script setup lang="ts">
	import AppHolder from "./components/AppHolder.vue";
	import { RouterView } from "vue-router";
	import { useAuthStore } from "./stores/authStore";

	const authStore = useAuthStore();

	document.addEventListener("visibilitychange", () => {
		if(document.visibilityState == "hidden" && authStore.jwt) {
			localStorage.setItem("jwt", authStore.jwt);
		}
	});
</script>

<template>
	<AppHolder>
		<RouterView/>
	</AppHolder>
</template>