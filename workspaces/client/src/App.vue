<script setup lang="ts">
	import AppHolder from "./components/AppHolder.vue";
	import { RouterView } from "vue-router";
</script>

<template>
	<AppHolder>
		<RouterView />
	</AppHolder>
</template>