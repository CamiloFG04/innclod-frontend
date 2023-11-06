<script lang="ts" setup>
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { Documento } from '../interfaces/document';
import { useRouter } from 'vue-router';
interface Props {
  documento?: Documento;
  isLoading: boolean;
}
const props = defineProps<Props>();
const router = useRouter();
</script>

<template>
  <LoaderSpinner v-if="props.isLoading" />
  <div v-else class="q-pa-md row items-start q-gutter-md">
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">
          {{ props.documento?.DOC_NOMBRE }}
        </div>
        <div class="text-subtitle2">
          {{ props.documento?.DOC_CODIGO }}
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ props.documento?.DOC_CONTENIDO }}
      </q-card-section>
    </q-card>
  </div>
  <div class="q-pa-md">
    <q-btn
      color="black"
      label="Volver"
      @click="router.push({ name: 'documents' })"
    />
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
