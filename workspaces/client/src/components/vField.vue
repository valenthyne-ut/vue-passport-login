<script setup lang="ts">
	import { computed } from "vue";

	const props = defineProps({
		name: {
			type: String,
			required: true
		}
	});

	const cName = computed(() => {
		return props.name.trim().endsWith(":") ? props.name : props.name + ":";
	});
</script>

<template>
	<div class="flex items-center">
		<span class="py-1 px-2 me-1 rounded bg-zinc-800 text-white font-bold">{{ cName }}</span>
		<slot></slot>
	</div>
</template>