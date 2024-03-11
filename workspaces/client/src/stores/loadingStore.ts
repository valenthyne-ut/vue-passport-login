import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
	const loadingTypes = ref<Array<string>>([]);

	function typePresent(type: string): boolean {
		return (loadingTypes.value.find(value => value === type) !== undefined);
	}

	function addType(type: string) {
		loadingTypes.value.push(type);
	}

	function removeType(type: string) {
		loadingTypes.value = loadingTypes.value.filter(value => value !== type);
	}

	function clearAll() {
		loadingTypes.value = [];
	}

	return { loadingTypes, typePresent, addType, removeType, clearAll };
});