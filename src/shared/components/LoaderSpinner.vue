<script lang="ts" setup>
interface Props {
  color?: string;
  size?: string;
  thickness?: number;
  title?: string;
  showTitle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '3rem',
  thickness: 5,
  title: 'Loading',
  showTitle: true,
});
</script>

<template>
  <div class="column items-center">
    <q-spinner
      :color="props.color"
      :size="props.size"
      :thickness="props.thickness"
    />
    <span class="q-mt-sm" v-if="props.showTitle">{{ props.title }}</span>
  </div>
</template>

<style scoped></style>
