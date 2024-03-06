<script setup lang="ts">
	import LoginInputFields from "@/components/LoginView/LoginInputFields.vue";
	import vCard from "@/components/vCard.vue";
	import vFillButton from "@/components/vFillButton.vue";
</script>

<template>
	<vCard>
		<h1 class="text-2xl font-bold self-center">Login</h1>
		<LoginInputFields />
		<vFillButton class="mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-2xl font-bold">
			Login
		</vFillButton>
	</vCard>
</template>