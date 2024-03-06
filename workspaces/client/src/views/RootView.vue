<script setup lang="ts">
	import vCard from "@/components/vCard.vue";
	import vField from "@/components/vField.vue";
	import vFillButton from "@/components/vFillButton.vue";
</script>

<template>
	<vCard>
		<h1 class="text-3xl font-bold self-center">Account details</h1>
		<ul class="mt-4 flex flex-col gap-1">
			<li>
				<vField name="Username"></vField>
			</li>
			<li>
				<vField name="Password"></vField>
			</li>
		</ul>
		<vFillButton class="mt-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-2xl text-white font-bold">
			Logout
		</vFillButton>
	</vCard>
</template>