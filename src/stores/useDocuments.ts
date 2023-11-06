import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useDocumentsStore = defineStore('documents', () => {
  const count = ref(0);

  return {
    // state
    count,

    // getters
    squareCount: computed(() => count.value * count.value),

    // actions
  };
});
