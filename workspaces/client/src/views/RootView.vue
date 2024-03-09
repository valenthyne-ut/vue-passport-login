<script setup lang="ts">
	import vAlert from "@/components/vAlert.vue";
	import vCard from "@/components/vCard.vue";
	import vField from "@/components/vField.vue";
	import vFillButton from "@/components/vFillButton.vue";
	import router from "@/router";
	import { useAuthStore } from "@/stores/authStore";
	import { ref } from "vue";

	const authStore = useAuthStore();
	const errorText = ref<string>("");

	async function logout() {
		errorText.value = "";
		try {
			await authStore.clearAuthentication();
			router.push({ name: "login" });
		} catch(error) {
			errorText.value = (error as Error).message || error as string;
		}
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
		<vFillButton @click="logout" class="mt-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-2xl text-white font-bold">
			Logout
		</vFillButton>
	</vCard>
</template>