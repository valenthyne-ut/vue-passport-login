<script setup lang="ts">
	import LoginInputFields from "@/components/LoginView/LoginInputFields.vue";
	import vAlert from "@/components/vAlert.vue";
	import vCard from "@/components/vCard.vue";
	import vFillButton from "@/components/vFillButton.vue";
	import { useLoginStore } from "@/stores/loginStore";
	import { computed, ref } from "vue";

	const loginStore = useLoginStore();
	const loginStatus = ref<{ successful: boolean, text: string }>({ successful: false, text: "" });

	const cAlertType = computed(() => {
		return loginStatus.value.successful ? "success" : "error";
	});

	function setLoginStatus(successful: boolean, text: string) {
		loginStatus.value.successful = successful;
		loginStatus.value.text = text;
	}

	async function login() {
		setLoginStatus(false, "");
		try {
			console.log(await loginStore.attemptLogin());
			setLoginStatus(true, "Logged in successfully. Redirecting..");
		} catch(error) {
			setLoginStatus(false, (error as Error).message || error as string);
		}
	}

	async function createAccount() {
		setLoginStatus(false, "");
		try {
			await loginStore.attemptCreateAccount();
			setLoginStatus(true, "Account created successfully.");
		} catch(error) {
			setLoginStatus(false, (error as Error).message || error as string);
		}
	}
</script>

<template>
	<vCard>
		<h1 class="text-2xl font-bold self-center">Login</h1>
		<vAlert class="mt-2" :type="cAlertType" :dismissable="true" v-model:alert-text="loginStatus.text"/>
		<LoginInputFields />
		<div class="flex items-center gap-3 mt-4 select-none">
			<vFillButton @click="login" class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-xl text-white font-bold">
				Login
			</vFillButton>
			or
			<vFillButton @click="createAccount" class="bg-green-600 hover:bg-green-700 active:bg-green-800 text-xl text-white font-bold">
				Create account
			</vFillButton>
		</div>
	</vCard>
</template>