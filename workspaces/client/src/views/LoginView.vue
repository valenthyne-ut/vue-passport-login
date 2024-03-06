<script setup lang="ts">
	import LoginInputFields from "@/components/LoginView/LoginInputFields.vue";
	import vCard from "@/components/vCard.vue";
	import vFillButton from "@/components/vFillButton.vue";
</script>

<template>
	<vCard>
		<h1 class="text-2xl font-bold self-center">Login</h1>
		<LoginInputFields />
		<div class="flex items-center gap-3 mt-4 select-none">
			<vFillButton class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-xl text-white font-bold">
				Login
			</vFillButton>
			or
			<vFillButton class="bg-green-600 hover:bg-green-700 active:bg-green-800 text-xl text-white font-bold">
				Create account
			</vFillButton>
		</div>
	</vCard>
</template>