<script setup lang="ts">
	import vCard from "@/components/vCard.vue";
	import vButton from "@/components/vButton.vue";
	import vField from "@/components/vField.vue";
</script>

<template>
	<vCard>
		<h1 class="text-3xl font-bold self-center">Account details</h1>
		<ul class="pt-4 flex flex-col gap-1">
			<li>
				<vField name="Username"></vField>
			</li>
			<li>
				<vField name="Password"></vField>
			</li>
		</ul>
		<div class="pt-1 flex">
			<vButton class="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white">Logout</vButton>
		</div>
	</vCard>
</template>