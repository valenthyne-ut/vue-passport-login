<script setup lang="ts">
	import { computed, ref } from "vue";
	import vField from "../vField.vue";
	import { useLoginStore } from "@/stores/loginStore";

	const loginStore = useLoginStore();

	const passwordVisible = ref<boolean>(false);

	const cInputType = computed(() => {
		return passwordVisible.value ? "text" : "password";
	});
	const cPasswordVisible = computed(() => {
		return passwordVisible.value ? "bi-eye-fill" : "bi-eye-slash-fill";
	});

	function togglePasswordVisibility() {
		passwordVisible.value = !passwordVisible.value;
	}
</script>

<template>
	<vField name="Username" class="mt-4">
		<input name="username" type="text" placeholder="Enter your username here" v-model="loginStore.username" class="outline-none grow min-w-0 overflow-ellipsis">
	</vField>
	<vField name="Password" class="mt-1">
		<input name="password" :type="cInputType" placeholder="Enter your password here" v-model="loginStore.password" class="outline-none grow min-w-0 overflow-ellipsis">
		<button type="button" class="ms-1" @click="togglePasswordVisibility">
			<i :class="cPasswordVisible"></i>
		</button>
	</vField>
</template>