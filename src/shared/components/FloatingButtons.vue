<script lang="ts" setup>
import { Button, Size } from '../interfaces/button';

interface Props {
  buttons: Button[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="fab">
    <q-btn
      v-for="button of props.buttons"
      :key="button.icon"
      class="q-mr-sm"
      round
      :color="button.color || 'primary'"
      :icon="button.icon"
      :size="button.size || Size.lg"
      @click="button.action"
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
