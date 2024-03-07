<script setup lang="ts">
	import { computed } from "vue";

	const props = defineProps({
		type: {
			type: String,
			required: true
		},
		dismissable: {
			type: Boolean,
			required: false,
			default: false
		}
	});

	const text = defineModel("alertText", { 
		type: String,
		required: true 
	});

	const cType = computed(() => {
		let style = "";

		switch(props.type) {
		case "error":
			style = "bg-red-200 border-red-400 text-red-950";
			break;
		case "success":
			style = "bg-green-200 border-green-400 text-green-950";
			break;
		}

		return style;
	});

	const cVisible = computed(() => {
		return text.value.length > 0 ? "flex" : "hidden";
	});

	function dismiss() {
		text.value = "";
	}
</script>

<template>
	<div class="w-full py-2 px-4 items-center border rounded" :class="[cVisible, cType]">
		{{ text }}
		<button type="button" class="ms-auto" @click="dismiss" v-if="props.dismissable">
			<i class="bi-x-lg text-lg"></i>
		</button>
	</div>
</template>