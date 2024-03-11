<script setup lang="ts">
	import vAlert from "@/components/vAlert.vue";
	import vCard from "@/components/vCard.vue";
	import vField from "@/components/vField.vue";
	import vFillButton from "@/components/vFillButton.vue";
	import vSpinner from "@/components/vSpinner.vue";
	import router from "@/router";
	import { useAuthStore } from "@/stores/authStore";
	import { useLoadingStore } from "@/stores/loadingStore";
	import { ref } from "vue";

	const authStore = useAuthStore();
	const loadStore = useLoadingStore();

	const errorText = ref<string>("");

	async function logout() {
		errorText.value = "";
		loadStore.addType("logout");
		try {
			await authStore.clearAuthentication();
			router.push({ name: "login" });
		} catch(error) {
			errorText.value = (error as Error).message || error as string;
		}
		loadStore.removeType("logout");
	}
</script>

<template>
	<vCard>
		<h1 class="text-3xl font-bold self-center">Account details</h1>
		<vAlert class="mt-2" type="error" :dismissable="true" v-model:alert-text="errorText"/>
		<ul class="mt-4 flex flex-col gap-1">
			<li>
				<vField name="Username">{{ authStore.user?.name || "unknown" }}</vField>
			</li>
		</ul>
		<div v-if="loadStore.typePresent('logout')" class="mt-4 py-3 px-3 flex justify-center items-center bg-gray-100 rounded">
			<vSpinner />
		</div>
		<vFillButton v-else @click="logout" class="mt-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-2xl text-white font-bold">
			Logout
		</vFillButton>
	</vCard>
</template>